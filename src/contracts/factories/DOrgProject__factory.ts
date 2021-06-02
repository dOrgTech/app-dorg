/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DOrgProject, DOrgProjectInterface } from "../DOrgProject";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "PayeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "payee",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "account",
        type: "address",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "released",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "shares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReleased",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalShares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_projectName",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "_payees",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_shares",
        type: "uint256[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "payees",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shares_",
        type: "uint256[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611bff806100206000396000f3fe60806040526004361061008a5760003560e01c80638b83209b116100595780638b83209b146101625780639852595c1461019f5780639a33e300146101dc578063ce7c2ac214610207578063e33b7de314610244576100d1565b806319165587146100d657806324f3ae78146100ff5780633a98ef391461011b5780637fbbe46f14610146576100d1565b366100d1577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be7706100b861026f565b346040516100c792919061130e565b60405180910390a1005b600080fd5b3480156100e257600080fd5b506100fd60048036038101906100f89190610f79565b610277565b005b6101196004803603810190610114919061100e565b6104f6565b005b34801561012757600080fd5b506101306105f3565b60405161013d9190611499565b60405180910390f35b610160600480360381019061015b9190610fa2565b6105fd565b005b34801561016e57600080fd5b50610189600480360381019061018491906110a5565b61080a565b60405161019691906112ca565b60405180910390f35b3480156101ab57600080fd5b506101c660048036038101906101c19190610f50565b610878565b6040516101d39190611499565b60405180910390f35b3480156101e857600080fd5b506101f16108c1565b6040516101fe9190611337565b60405180910390f35b34801561021357600080fd5b5061022e60048036038101906102299190610f50565b61094f565b60405161023b9190611499565b60405180910390f35b34801561025057600080fd5b50610259610998565b6040516102669190611499565b60405180910390f35b600033905090565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054116102f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f090611379565b60405180910390fd5b60006002543073ffffffffffffffffffffffffffffffffffffffff16316103209190611589565b90506000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600154600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054846103b29190611610565b6103bc91906115df565b6103c6919061166a565b9050600081141561040c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610403906113d9565b60405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104579190611589565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806002546104a89190611589565b6002819055506104b883826109a2565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b05683826040516104e99291906112e5565b60405180910390a1505050565b600060019054906101000a900460ff168061051c575060008054906101000a900460ff16155b61055b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610552906113f9565b60405180910390fd5b60008060019054906101000a900460ff1615905080156105ab576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b83600690805190602001906105c1929190610cda565b506105cc83836105fd565b80156105ed5760008060016101000a81548160ff0219169083151502179055505b50505050565b6000600154905090565b600060019054906101000a900460ff1680610623575060008054906101000a900460ff16155b610662576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610659906113f9565b60405180910390fd5b60008060019054906101000a900460ff1615905080156106b2576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b81518351146106f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ed90611419565b60405180910390fd5b600083511161073a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073190611459565b60405180910390fd5b60005b83518110156107e3576107d0848281518110610782577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518483815181106107c3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151610aad565b80806107db906117c7565b91505061073d565b5080156108055760008060016101000a81548160ff0219169083151502179055505b505050565b600060058281548110610846577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600680546108ce90611764565b80601f01602080910402602001604051908101604052809291908181526020018280546108fa90611764565b80156109475780601f1061091c57610100808354040283529160200191610947565b820191906000526020600020905b81548152906001019060200180831161092a57829003601f168201915b505050505081565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600254905090565b803073ffffffffffffffffffffffffffffffffffffffff163110156109fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f3906113b9565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff1682604051610a22906112b5565b60006040518083038185875af1925050503d8060008114610a5f576040519150601f19603f3d011682016040523d82523d6000602084013e610a64565b606091505b5050905080610aa8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9f90611399565b60405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610b1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1490611359565b60405180910390fd5b60008111610b60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5790611479565b60405180910390fd5b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610be2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bd990611439565b60405180910390fd5b6005829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600154610c979190611589565b6001819055507f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac8282604051610cce92919061130e565b60405180910390a15050565b828054610ce690611764565b90600052602060002090601f016020900481019282610d085760008555610d4f565b82601f10610d2157805160ff1916838001178555610d4f565b82800160010185558215610d4f579182015b82811115610d4e578251825591602001919060010190610d33565b5b509050610d5c9190610d60565b5090565b5b80821115610d79576000816000905550600101610d61565b5090565b6000610d90610d8b846114d9565b6114b4565b90508083825260208201905082856020860282011115610daf57600080fd5b60005b85811015610ddf5781610dc58882610e93565b845260208401935060208301925050600181019050610db2565b5050509392505050565b6000610dfc610df784611505565b6114b4565b90508083825260208201905082856020860282011115610e1b57600080fd5b60005b85811015610e4b5781610e318882610f3b565b845260208401935060208301925050600181019050610e1e565b5050509392505050565b6000610e68610e6384611531565b6114b4565b905082815260208101848484011115610e8057600080fd5b610e8b848285611722565b509392505050565b600081359050610ea281611b84565b92915050565b600081359050610eb781611b9b565b92915050565b600082601f830112610ece57600080fd5b8135610ede848260208601610d7d565b91505092915050565b600082601f830112610ef857600080fd5b8135610f08848260208601610de9565b91505092915050565b600082601f830112610f2257600080fd5b8135610f32848260208601610e55565b91505092915050565b600081359050610f4a81611bb2565b92915050565b600060208284031215610f6257600080fd5b6000610f7084828501610e93565b91505092915050565b600060208284031215610f8b57600080fd5b6000610f9984828501610ea8565b91505092915050565b60008060408385031215610fb557600080fd5b600083013567ffffffffffffffff811115610fcf57600080fd5b610fdb85828601610ebd565b925050602083013567ffffffffffffffff811115610ff857600080fd5b61100485828601610ee7565b9150509250929050565b60008060006060848603121561102357600080fd5b600084013567ffffffffffffffff81111561103d57600080fd5b61104986828701610f11565b935050602084013567ffffffffffffffff81111561106657600080fd5b61107286828701610ebd565b925050604084013567ffffffffffffffff81111561108f57600080fd5b61109b86828701610ee7565b9150509250925092565b6000602082840312156110b757600080fd5b60006110c584828501610f3b565b91505092915050565b6110d7816116ec565b82525050565b6110e68161169e565b82525050565b60006110f782611562565b6111018185611578565b9350611111818560208601611731565b61111a816118cc565b840191505092915050565b6000611132602c83611578565b915061113d826118dd565b604082019050919050565b6000611155602683611578565b91506111608261192c565b604082019050919050565b6000611178603a83611578565b91506111838261197b565b604082019050919050565b600061119b601d83611578565b91506111a6826119ca565b602082019050919050565b60006111be602b83611578565b91506111c9826119f3565b604082019050919050565b60006111e1602e83611578565b91506111ec82611a42565b604082019050919050565b6000611204603283611578565b915061120f82611a91565b604082019050919050565b600061122760008361156d565b915061123282611ae0565b600082019050919050565b600061124a602b83611578565b915061125582611ae3565b604082019050919050565b600061126d601a83611578565b915061127882611b32565b602082019050919050565b6000611290601d83611578565b915061129b82611b5b565b602082019050919050565b6112af816116e2565b82525050565b60006112c08261121a565b9150819050919050565b60006020820190506112df60008301846110dd565b92915050565b60006040820190506112fa60008301856110ce565b61130760208301846112a6565b9392505050565b600060408201905061132360008301856110dd565b61133060208301846112a6565b9392505050565b6000602082019050818103600083015261135181846110ec565b905092915050565b6000602082019050818103600083015261137281611125565b9050919050565b6000602082019050818103600083015261139281611148565b9050919050565b600060208201905081810360008301526113b28161116b565b9050919050565b600060208201905081810360008301526113d28161118e565b9050919050565b600060208201905081810360008301526113f2816111b1565b9050919050565b60006020820190508181036000830152611412816111d4565b9050919050565b60006020820190508181036000830152611432816111f7565b9050919050565b600060208201905081810360008301526114528161123d565b9050919050565b6000602082019050818103600083015261147281611260565b9050919050565b6000602082019050818103600083015261149281611283565b9050919050565b60006020820190506114ae60008301846112a6565b92915050565b60006114be6114cf565b90506114ca8282611796565b919050565b6000604051905090565b600067ffffffffffffffff8211156114f4576114f361189d565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156115205761151f61189d565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561154c5761154b61189d565b5b611555826118cc565b9050602081019050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b6000611594826116e2565b915061159f836116e2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156115d4576115d3611810565b5b828201905092915050565b60006115ea826116e2565b91506115f5836116e2565b9250826116055761160461183f565b5b828204905092915050565b600061161b826116e2565b9150611626836116e2565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561165f5761165e611810565b5b828202905092915050565b6000611675826116e2565b9150611680836116e2565b92508282101561169357611692611810565b5b828203905092915050565b60006116a9826116c2565b9050919050565b60006116bb826116c2565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006116f7826116fe565b9050919050565b600061170982611710565b9050919050565b600061171b826116c2565b9050919050565b82818337600083830152505050565b60005b8381101561174f578082015181840152602081019050611734565b8381111561175e576000848401525b50505050565b6000600282049050600182168061177c57607f821691505b602082108114156117905761178f61186e565b5b50919050565b61179f826118cc565b810181811067ffffffffffffffff821117156117be576117bd61189d565b5b80604052505050565b60006117d2826116e2565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561180557611804611810565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f5061796d656e7453706c69747465723a206163636f756e74206973207468652060008201527f7a65726f20616464726573730000000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a206163636f756e7420686173206e6f2060008201527f7368617265730000000000000000000000000000000000000000000000000000602082015250565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b7f416464726573733a20696e73756666696369656e742062616c616e6365000000600082015250565b7f5061796d656e7453706c69747465723a206163636f756e74206973206e6f742060008201527f647565207061796d656e74000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a2070617965657320616e64207368617260008201527f6573206c656e677468206d69736d617463680000000000000000000000000000602082015250565b50565b7f5061796d656e7453706c69747465723a206163636f756e7420616c726561647960008201527f2068617320736861726573000000000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a206e6f20706179656573000000000000600082015250565b7f5061796d656e7453706c69747465723a20736861726573206172652030000000600082015250565b611b8d8161169e565b8114611b9857600080fd5b50565b611ba4816116b0565b8114611baf57600080fd5b50565b611bbb816116e2565b8114611bc657600080fd5b5056fea2646970667358221220aeec735fb77656ca75510249d363f252cfebd32e4575147e119c964846b78e3064736f6c63430008040033";

export class DOrgProject__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DOrgProject> {
    return super.deploy(overrides || {}) as Promise<DOrgProject>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DOrgProject {
    return super.attach(address) as DOrgProject;
  }
  connect(signer: Signer): DOrgProject__factory {
    return super.connect(signer) as DOrgProject__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DOrgProjectInterface {
    return new utils.Interface(_abi) as DOrgProjectInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DOrgProject {
    return new Contract(address, _abi, signerOrProvider) as DOrgProject;
  }
}