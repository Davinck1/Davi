
export interface Block {
  id: number;
  votes: Vote[];
  timestamp: string;
  previousHash: string;
  hash: string;
}

export interface Vote {
  voter: string;
  candidate: string;
  time: string;
}

export class SimpleBlockchain {
  blocks: Block[];

  constructor() {
    this.blocks = [];
    
    // Create 1 blcok
    this.createFirstBlock();
  }

  private createFirstBlock() {
    const firstBlock: Block = {
      id: 0,
      votes: [],
      timestamp: new Date().toLocaleString(),
      previousHash: "0000", // 1 hash
      hash: "0000" 
    };
    this.blocks.push(firstBlock);
  }

  // add a vote
  addVote(voter: string, candidate: string) {
    const vote: Vote = {
      voter: voter,
      candidate: candidate,
      time: new Date().toLocaleString()
    };

    // Create a blovck aftr vote
    const previousBlock = this.blocks[this.blocks.length - 1];
    const newBlock: Block = {
      id: this.blocks.length,
      votes: [vote], // the vote go here
      timestamp: new Date().toLocaleString(),
      previousHash: previousBlock.hash,
      hash: ""
    };

    // get a hash match the first 2 digit ( this is gpt code i couldt do it )
    let blockContent = `${newBlock.id}${newBlock.timestamp}${JSON.stringify(newBlock.votes)}${newBlock.previousHash}`;
    let newHash = this.createSimpleHash(blockContent);

    
    while (!newHash.startsWith(previousBlock.hash.substring(0, 2))) {hash
      newBlock.timestamp = new Date().toLocaleString(); 
      blockContent = `${newBlock.id}${newBlock.timestamp}${JSON.stringify(newBlock.votes)}${newBlock.previousHash}`;
      newHash = this.createSimpleHash(blockContent);
    }

    // add block and hash
    newBlock.hash = newHash;
    this.blocks.push(newBlock);
  }

  // 
  private createSimpleHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(16).padStart(4, '0');
  }
}
