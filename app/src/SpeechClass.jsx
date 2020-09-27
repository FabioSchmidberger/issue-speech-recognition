import React, {Component} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const DOWNSAMPLING_WORKER = './downsampling_worker.js';

class SpeechClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			connected: false,
			recording: false,
			recordingStart: 0,
			recordingTime: 0,
			partialResults: []
		};
	}
	
	componentDidMount() {
		let recognitionCount = 0;
		
		this.socket = io.connect('http://192.168.178.52:4000', {});
		
		this.socket.on('connect', () => {
			console.log('socket connected');
			this.setState({connected: true});
		});
		
		this.socket.on('disconnect', () => {
			console.log('socket disconnected');
			this.setState({connected: false});
			this.stopRecording();
		});
		
		this.socket.on('recognize', (results) => {
			console.log('recognized:', results);
			const {partialResults} = this.state;
			results.id = recognitionCount++;
			partialResults.push(results);
			this.setState({partialResults});
		});
	}
	
	render() {
		return (
		<SpeechContainer>
			{this.renderRecognitionOutput()}
			<div>
				{!this.state.recording ? 
					<StartButton onClick={this.startRecording}>
					Start Recording
				</StartButton>
				:
				<StopButton onClick={this.stopRecording}>
				Stop Recording
				</StopButton>
				
				}
				
			</div>
		</SpeechContainer>);
	}
	
	getText() {
		const wordList = this.state.partialResults.flatMap(element => element.text);
		console.log(wordList)
	

		return wordList.join(" ");
		//return "Create a new issue for the component backend with the title: Add SSO Support Add the labels user story, and feature request Assign Fabio"
	}

	renderRecognitionOutput() {
		return (
			<TextContainer>
				{this.getText()}
			</TextContainer>
		)
	}
	
	createAudioProcessor(audioContext, audioSource) {
		let processor = audioContext.createScriptProcessor(4096, 1, 1);
		
		const sampleRate = audioSource.context.sampleRate;
		
		let downsampler = new Worker(DOWNSAMPLING_WORKER);
		downsampler.postMessage({command: "init", inputSampleRate: sampleRate});
		downsampler.onmessage = (e) => {
			if (this.socket.connected) {
				this.socket.emit('stream-data', e.data.buffer);
			}
		};
		
		processor.onaudioprocess = (event) => {
			var data = event.inputBuffer.getChannelData(0);
			downsampler.postMessage({command: "process", inputFrame: data});
		};
		
		processor.shutdown = () => {
			processor.disconnect();
			this.onaudioprocess = null;
		};
		
		processor.connect(audioContext.destination);
		
		return processor;
	}
	
	startRecording = e => {
		if (!this.state.recording) {
			this.recordingInterval = setInterval(() => {
				let recordingTime = new Date().getTime() - this.state.recordingStart;
				this.setState({recordingTime});
			}, 100);
			
			this.setState({
				recording: true,
				recordingStart: new Date().getTime(),
				recordingTime: 0
			}, () => {
				this.startMicrophone();
			});
		}
	};
	
	startMicrophone() {
		this.audioContext = new AudioContext();
		
		const success = (stream) => {
			console.log('started recording');
			this.mediaStream = stream;
			this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
			this.processor = this.createAudioProcessor(this.audioContext, this.mediaStreamSource);
			this.mediaStreamSource.connect(this.processor);
		};
		
		const fail = (e) => {
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
	
	stopRecording = e => {
		if (this.state.recording) {
			if (this.socket.connected) {
				this.socket.emit('stream-reset');
			}
			clearInterval(this.recordingInterval);
			this.setState({
				recording: false
			}, () => {
				this.stopMicrophone();
			});
		}
	};
	
	stopMicrophone() {
		if (this.mediaStream) {
			this.mediaStream.getTracks()[0].stop();
		}
		if (this.mediaStreamSource) {
			this.mediaStreamSource.disconnect();
		}
		if (this.processor) {
			this.processor.shutdown();
		}
		if (this.audioContext) {
			this.audioContext.close();
		}
	}
}

const Button = styled.button`
	font-size: 15px;
	border-width: 0px;
  padding: 20px;
  border-radius: 5px;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
`;

const StartButton = styled(Button)`
	background-color: green;
	color: white;
`

const StopButton = styled(Button)`
	background-color: hsl(0, 100%, 60%);
	color: white;
`

const TextContainer = styled.div`
	font-size: 30px;
	padding: 50px;
	margin: 20px;
	width: 500px;
	min-height: 400px;
	line-height: 2;
	border-radius: 20px;
	background-color: lightgrey;
`;

const SpeechContainer = styled.div`
	display: flex; 
	flex-direction: column;
	align-items: center;
`;


export default SpeechClass;
