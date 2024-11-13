// Simple block structure using basic types
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
  pendingVotes: Vote[];
  constructor() {
    this.blocks = [];
    this.pendingVotes = [];
    
    // Create first block (genesis block)
    this.createFirstBlock();
  }
  // Create the first block of our blockchain
  private createFirstBlock() {
    const firstBlock: Block = {
      id: 0,
      votes: [],
      timestamp: new Date().toLocaleString(),
      previousHash: "0000",
      hash: "0000"
    };
    this.blocks.push(firstBlock);
  }
  // Add a new vote to pending votes
  addVote(voter: string, candidate: string) {
    const vote: Vote = {
      voter: voter,
      candidate: candidate,
      time: new Date().toLocaleString()
    };
    this.pendingVotes.push(vote);
  }
  // Create a simple hash (not cryptographically secure, just for demonstration)
  private createSimpleHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash = hash & hash;
    }
    // Convert to positive 4-digit hex
    return Math.abs(hash).toString(16).padStart(4, '0');
  }
  // Create a new block with pending votes
  createNewBlock() {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const newBlock: Block = {
      id: this.blocks.length,
      votes: [...this.pendingVotes],
      timestamp: new Date().toLocaleString(),
      previousHash: previousBlock.hash,
      hash: ""
    };
    // Create hash based on block content
    const blockContent = `${newBlock.id}${newBlock.timestamp}${JSON.stringify(newBlock.votes)}${newBlock.previousHash}`;
    newBlock.hash = this.createSimpleHash(blockContent);
    // Add block to chain and clear pending votes
    this.blocks.push(newBlock);
    this.pendingVotes = [];
    return newBlock;
  }
}
