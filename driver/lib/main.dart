import 'package:flutter/material.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;
import 'package:location/location.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart' as dotenv;
import 'dart:convert';
import 'package:flutter/services.dart';

void main() async {
  await dotenv.DotEnv().load();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: ElevatedButton(
            onPressed: ingestCoordinate,
            child: Text('Ingest Coordinate'),
          ),
        ),
      ),
    );
  }

  void ingestCoordinate() async {
    var apiUrl = dotenv.dotenv.env['ALCHEMY_API_KEY']!;
    var httpClient = http.Client();
    var ethClient = Web3Client(apiUrl, httpClient);

    var privateKey = dotenv.dotenv.env['PRIVATE_KEY']!;
    var credentials = EthPrivateKey.fromHex(privateKey);

    var contractAddress = dotenv.dotenv.env['CONTRACT_ADDRESS']!;
    String abiJson = await rootBundle.loadString('assets/GeoLogixRefund.json');
    var abi = jsonDecode(abiJson);

    var contract = DeployedContract(ContractAbi.fromJson(abi, "GeoLogixRefund"),
        EthereumAddress.fromHex(contractAddress));

    var ingestCoordinateFunction = contract.function('ingestCoordinate');

    var location = Location();
    var currentLocation = await location.getLocation();

    var lat = currentLocation.latitude!.round();
    var lon = currentLocation.longitude!.round();
    var timestamp = DateTime.now().millisecondsSinceEpoch;

    var response = await ethClient.sendTransaction(
      credentials,
      Transaction.callContract(
        contract: contract,
        function: ingestCoordinateFunction,
        parameters: [
          BigInt.from(lat),
          BigInt.from(lon),
          BigInt.from(timestamp)
        ],
      ),
    );

    print(response);
  }
}
