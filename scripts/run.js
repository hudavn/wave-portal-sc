const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const WavePortalFactory = await hre.ethers.getContractFactory("WavePortal");
    const WaveContract = await WavePortalFactory.deploy();
    await WaveContract.deployed();

    console.log("Contract deployed to: ", WaveContract.address);
    console.log("Contract deployed by: ", owner.address);

    let waveCount = await WaveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxn = await WaveContract.wave("A message!");
    await waveTxn.wait();

    waveTxn = await WaveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait();

    let allWaves = await WaveContract.getAllWaves();

    console.log(allWaves);
};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();