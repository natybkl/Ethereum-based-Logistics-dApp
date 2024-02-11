//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Token.sol";

contract RefundDriver {
    address public contractOwner;
    Token public tokenContract;
    
    struct DriverData {
        string alias;
        uint256 latitude;
        uint256 longitude;
        uint256 allowedDistance;
        uint256 requiredTime;
        uint256 timeTolerance;
        uint256 refundValue;
        uint256 rating;
        uint256 tokensEarned;
        bool registered;
        bool complianceStatus;
    }
    
    mapping(address => DriverData) public drivers;
    address[] public driverAddresses;

    event DriverAdded(address driverAddress);
    event CoordReceived(address driverAddress, uint256 latitude, uint256 longitude, uint256 timestamp);
    event ComplianceStatusChanged(address driverAddress, bool isInCompliance);

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the owner can perform this action");
        _;
    }

    constructor(address initialTokenHolder) {
        contractOwner = msg.sender;
        tokenContract = new Token(initialTokenHolder);
    }

    function addDriver(address driverAddress, string memory alias, uint256 latitude, uint256 longitude, uint256 allowedDistance, uint256 requiredTime, uint256 timeTolerance, uint256 refundValue) external onlyOwner {
        require(!drivers[driverAddress].registered, "Driver already registered");
        drivers[driverAddress] = DriverData(alias, latitude, longitude, allowedDistance, requiredTime, timeTolerance, refundValue, 0, 0, true, false);
        driverAddresses.push(driverAddress);
        emit DriverAdded(driverAddress);
    }

    function removeDriver(address driverAddress) external onlyOwner {
        require(drivers[driverAddress].registered, "Driver not registered");
        delete drivers[driverAddress];
        for (uint i = 0; i < driverAddresses.length; i++) {
            if (driverAddresses[i] == driverAddress) {
                driverAddresses[i] = driverAddresses[driverAddresses.length - 1];
                driverAddresses.pop();
                break;
            }
        }
    }

    function ingestCoordinates(uint256 latitude, uint256 longitude, uint256 timestamp) external {
        address driverAddress = msg.sender;
        require(drivers[driverAddress].registered, "Driver not registered");
        uint256 distance = calculateDistance(latitude, longitude, driverAddress);
        bool oldComplianceStatus = drivers[driverAddress].complianceStatus;
        if (distance > drivers[driverAddress].allowedDistance || timestamp < drivers[driverAddress].requiredTime || timestamp > drivers[driverAddress].requiredTime + drivers[driverAddress].timeTolerance) {
            drivers[driverAddress].complianceStatus = false;
        } else {
            drivers[driverAddress].complianceStatus = true;
        }
        if (oldComplianceStatus != drivers[driverAddress].complianceStatus) {
            emit ComplianceStatusChanged(driverAddress, drivers[driverAddress].complianceStatus);
        }
        emit CoordReceived(driverAddress, latitude, longitude, timestamp);
        if (drivers[driverAddress].complianceStatus) {
            drivers[driverAddress].rating += 1;
        } else {
            if (drivers[driverAddress].rating > 0) {
                drivers[driverAddress].rating -= 1;
            }
        }
    }

    function updateDriverInfo(address driverAddress, uint256 newLatitude, uint256 newLongitude, uint256 newAllowedDistance, uint256 newRequiredTime, uint256 newTimeTolerance, uint256 newRefundValue) external onlyOwner {
        require(drivers[driverAddress].registered, "Driver not registered");
        drivers[driverAddress].latitude = newLatitude;
        drivers[driverAddress].longitude = newLongitude;
        drivers[driverAddress].allowedDistance = newAllowedDistance;
        drivers[driverAddress].requiredTime = newRequiredTime;
        drivers[driverAddress].timeTolerance = newTimeTolerance;
        drivers[driverAddress].refundValue = newRefundValue;
    }

    function getDriverInfo(address driverAddress) external view returns (string memory, uint256, uint256, uint256, uint256, uint256, uint256, uint256, uint256, bool) {
        DriverData memory driver = drivers[driverAddress];
        require(driver.registered, "Driver not registered");
        return (driver.alias, driver.latitude, driver.longitude, driver.allowedDistance, driver.requiredTime, driver.timeTolerance, driver.refundValue, driver.rating, driver.tokensEarned, driver.complianceStatus);
    }

    function refundDriver(address driverAddress) external onlyOwner payable {
        require(drivers[driverAddress].registered, "Driver not registered");
        require(drivers[driverAddress].complianceStatus, "Driver not compliant");
        payable(driverAddress).transfer(drivers[driverAddress].refundValue);
    }

    function rewardDriver(address driverAddress) external onlyOwner payable {
        require(drivers[driverAddress].registered, "Driver not registered");
        require(drivers[driverAddress].complianceStatus, "Driver not compliant");
        uint256 rewardAmount = drivers[driverAddress].rating * 2;
        tokenContract.transfer(driverAddress, rewardAmount);
        drivers[driverAddress].tokensEarned += rewardAmount;
    }

    function calculateDistance(uint256 lat2, uint256 lon2, address driverAddress) internal view returns (uint256) {
        (,uint256 lat1, uint256 lon1,,,,,,,) = getDriverInfo(driverAddress);
        uint256 distance = abs(int256(lat2) - int256(lat1)) + abs(int256(lon2) - int256(lon1));
        require(distance <= type(uint256).max, "Distance calculation overflow");
        return distance;
    }

    function abs(int256 x) internal pure returns (uint256) {
        return x >= 0 ? uint256(x) : uint256(-x);
    }
}
