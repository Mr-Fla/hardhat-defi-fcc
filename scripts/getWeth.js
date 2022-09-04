const { ethers, getNamedAccounts, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

const AMOUNT = ethers.utils.parseEther("0.1");

async function getWeth() {
    const { deployer } = await getNamedAccounts();
    //call the "deposit" function on the weth contract
    //abi, contract address
    //hardhat-helper...
    const iWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[network.config.chainId].wethToken,
        deployer
    );
    const txResponse = await iWeth.deposit({
        value: AMOUNT,
    });
    await txResponse.wait(1);
    const wethBalance = await iWeth.balanceOf(deployer);
    console.log(`Got ${wethBalance.toString()} WETH`);
}

module.exports = { getWeth, AMOUNT };
