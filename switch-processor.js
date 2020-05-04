class SwitchProcessor extends AudioWorkletProcessor {

  constructor() {
    super();
    this.isOn = false;
    this.port.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event) {
    this.isOn = true;
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      if (this.isOn) {
        output[channel].set(input[channel]);
      }
    }

    return true;
  }
}

registerProcessor('switch-processor', SwitchProcessor);
