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
  it('creates records', async () => {
    const result = await this.hospitalRecord.createRecord('shaima')
    const recordCount = await this.hospitalRecord.recordCount()
    assert.equal(recordCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.patientName, 'shaima')
  })
})