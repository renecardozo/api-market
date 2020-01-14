import mongoose from 'mongoose';

class Connection {
  
  constructor() {
    this.instance = null;
  }
  connect(stringConnection) {
    try {
      mongoose.connect(stringConnection);
      this.instance = mongoose.connection;
      this.instance.once('open', () => {
        console.log('# CONNECTED TO MONGO DATABASE ');
      });
      this.instance.on('error', () => {
        console.error('#FAILES: MONGO CONNECTION ERROR');
      })
    } catch (error) {
      throw error;
    }
  }
}

export default Connection;