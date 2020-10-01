import React, {Component, useState} from 'react';
import io from 'socket.io-client';
import RecordingButton from './components/RecordingButton';

const DOWNSAMPLING_WORKER = './downsampling_worker.js';

export function useSpeech () {
	const [isConnected, setIsConnected] = useState(false)
	const [isRecording, setIsRecording] = useState(false)
	const [recognitionOutput, setRecognitionOutput] = useState("")
	const socket = io.connect('http://192.168.178.52:4000', {});
	let mediaStream: any;
	let mediaStreamSource: any ;
	let processor: any;
	let audioContext: any;


		
	socket.on('connect', () => {
		console.log('socket connected');
		setIsConnected(true)
	});
	
	socket.on('disconnect', () => {
		console.log('socket disconnected');
		setIsConnected(false)
		stopRecording();
	});
	
	socket.on('recognize', (results: any) => {
		console.log('recognized:', results);
		setRecognitionOutput(recognitionOutput + " " + results)
	});
	
	const createAudioProcessor = (audioContext: any, audioSource: any) => {
		processor = audioContext.createScriptProcessor(4096, 1, 1);
		
		const sampleRate = audioSource.context.sampleRate;
		
		let downsampler = new Worker(DOWNSAMPLING_WORKER);
		downsampler.postMessage({command: "init", inputSampleRate: sampleRate});
		downsampler.onmessage = (e) => {
			if (socket.connected) {
				socket.emit('stream-data', e.data.buffer);
			}
		};
		
		processor.onaudioprocess = (event: any) => {
			var data = event.inputBuffer.getChannelData(0);
			downsampler.postMessage({command: "process", inputFrame: data});
		};
		
		processor.shutdown = () => {
			processor.disconnect();
			processor.onaudioprocess = null;
		};
		
		processor.connect(audioContext.destination);
		
		return processor;
	}
	
	const startRecording = () => {
		if (!isRecording) {
			setIsRecording(true)
			startMicrophone();
		}
	};
	
	const startMicrophone= () => {
		const audioContext = new AudioContext();
		
		const success = (stream: any) => {
			console.log('started recording');
			mediaStream = stream;
			mediaStreamSource = audioContext.createMediaStreamSource(stream);
			processor = createAudioProcessor(audioContext, mediaStreamSource);
			mediaStreamSource.connect(processor);
		};
		
		const fail = (e: any) => {
			console.error('recording failure', e);
		};
		
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: false,
				audio: true
			})
			.then(success)
			.catch(fail);
		}
		else {
			navigator.getUserMedia({
				video: false,
				audio: true
			}, success, fail);
		}
	}
	
	const stopRecording = () => {
		if (isRecording) {
			if (socket.connected) {
				socket.emit('stream-reset');
			}
			setIsRecording(false);
			stopMicrophone();
		}
	};
	
	const stopMicrophone = () => {
		if (mediaStream) {
			mediaStream.getTracks()[0].stop();
		}
		if (mediaStreamSource) {
			mediaStreamSource.disconnect();
		}
		if (processor) {
			processor.shutdown();
		}
		if (audioContext) {
			audioContext.close();
		}
	}

	return [startRecording, stopRecording]
};


