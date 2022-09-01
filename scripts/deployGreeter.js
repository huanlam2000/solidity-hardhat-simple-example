const hre = require('hardhat')

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const Greeter = await hre.ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy('Hello, world!')

    await greeter.deployed();

    console.log("Greeter deployed to: ", greeter.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });