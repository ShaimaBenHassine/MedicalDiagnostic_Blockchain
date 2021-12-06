const HospitalRecord = artifacts.require('./HospitalRecord.sol')

contract('HospitalRecord', (accounts) => {
  before(async () => {
    this.hospitalRecord = await HospitalRecord.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.hospitalRecord.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })
})