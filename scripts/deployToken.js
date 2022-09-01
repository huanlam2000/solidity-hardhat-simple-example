const { ethers } = require('hardhat');
const hre = require('hardhat')

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const Token = await ethers.getContractFactory("CITToken")
    const token = await Token.deploy()

    console.log("Token deployed to:", token.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });