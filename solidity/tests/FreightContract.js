import expect from 'chai'

describe("Frieght contract setup", function () {
  it("Deployment should assign the name field of the contract", async function () {
    const [owner] = await ethers.getSigners();

    const FreightContract = await ethers.getContractFactory("FreightContract");
    const TEST_NAME = "test blockfrieght parcel name"

    const c = await FreightContract.deploy(TEST_NAME);

    const name = await c.name();
    expect(name).to.equal(TEST_NAME);
  });

  it("Deployment should assign the owner field of the contract", async function () {
    const [owner] = await ethers.getSigners();

    const FreightContract = await ethers.getContractFactory("FreightContract");
    const TEST_NAME = "test blockfrieght parcel name"

    const c = await FreightContract.deploy(TEST_NAME);

    const contractOwner = await c.owner();
    expect(contractOwner).to.equal(owner.address);
  });
});