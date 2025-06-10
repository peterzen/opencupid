export class MockRedis {
  hashes: Record<string, Record<string,string>> = {}
  sets: Record<string, Set<string>> = {}
  multi() {
    const self = this
    return {
      hset(key: string, ...args: any[]) { self.hset(key, ...args); return this },
      expire(_key: string, _ttl: number) { return this },
      sadd(key: string, ...vals: string[]) { self.sadd(key, ...vals); return this },
      del(key: string) { self.del(key); return this },
      exec() { return Promise.resolve() }
    }
  }
  hset(key: string, ...args: any[]) {
    if (!this.hashes[key]) this.hashes[key] = {}
    for (let i=0; i<args.length; i+=2) {
      this.hashes[key][args[i]] = String(args[i+1])
    }
  }
  hgetall(key: string) {
    return this.hashes[key] || {}
  }
  smembers(key: string) {
    return Array.from(this.sets[key] || [])
  }
  sadd(key: string, ...vals: string[]) {
    if (!this.sets[key]) this.sets[key] = new Set()
    vals.forEach(v => this.sets[key].add(v))
  }
  del(key: string) {
    delete this.hashes[key]
    delete this.sets[key]
  }
}
