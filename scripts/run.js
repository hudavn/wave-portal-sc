const { Contract } = require("ethers");

const main = async() => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract deployed at: ", waveContract.address);

    /*
    Get contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract Balance: ",
        hre.ethers.utils.formatEther(contractBalance),
    );

    /*
    Send wave
    */
    const people = await hre.ethers.getSigners();
    for (let index = 1; index < people.length; index+=1) {
        let person = people[index];
        let waveTxn = await waveContract.connect(person).wave("A message!");
        await waveTxn.wait();
    }

    /* 
    Get contract balance to see updates
    */
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract Balance: ",
        hre.ethers.utils.formatEther(contractBalance),
    );
    
    let allWavesCount = await waveContract.getAllWavesCount();
    console.log("Total waves: ", allWavesCount.toNumber());
    let allWaves = await waveContract.getAllWaves();
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