/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PaymentSplitterInitializable,
  PaymentSplitterInitializableInterface,
} from "../PaymentSplitterInitializable";

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
    stateMutability: "payable",
    type: "receive",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061173b806100206000396000f3fe6080604052600436106100745760003560e01c80638b83209b1161004e5780638b83209b146101305780639852595c1461016d578063ce7c2ac2146101aa578063e33b7de3146101e7576100bb565b806319165587146100c05780633a98ef39146100e95780637fbbe46f14610114576100bb565b366100bb577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be7706100a2610212565b346040516100b1929190610f4b565b60405180910390a1005b600080fd5b3480156100cc57600080fd5b506100e760048036038101906100e29190610c86565b61021a565b005b3480156100f557600080fd5b506100fe610499565b60405161010b91906110b4565b60405180910390f35b61012e60048036038101906101299190610caf565b6104a3565b005b34801561013c57600080fd5b5061015760048036038101906101529190610d1b565b6106b0565b6040516101649190610f07565b60405180910390f35b34801561017957600080fd5b50610194600480360381019061018f9190610c5d565b61071e565b6040516101a191906110b4565b60405180910390f35b3480156101b657600080fd5b506101d160048036038101906101cc9190610c5d565b610767565b6040516101de91906110b4565b60405180910390f35b3480156101f357600080fd5b506101fc6107b0565b60405161020991906110b4565b60405180910390f35b600033905090565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541161029c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029390610f94565b60405180910390fd5b60006002543073ffffffffffffffffffffffffffffffffffffffff16316102c39190611168565b90506000600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600154600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548461035591906111ef565b61035f91906111be565b6103699190611249565b905060008114156103af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a690610ff4565b60405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546103fa9190611168565b600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508060025461044b9190611168565b60028190555061045b83826107ba565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056838260405161048c929190610f22565b60405180910390a1505050565b6000600154905090565b600060019054906101000a900460ff16806104c9575060008054906101000a900460ff16155b610508576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ff90611014565b60405180910390fd5b60008060019054906101000a900460ff161590508015610558576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b815183511461059c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059390611034565b60405180910390fd5b60008351116105e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d790611074565b60405180910390fd5b60005b835181101561068957610676848281518110610628577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151848381518110610669577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516108c5565b808061068190611332565b9150506105e3565b5080156106ab5760008060016101000a81548160ff0219169083151502179055505b505050565b6000600582815481106106ec577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600254905090565b803073ffffffffffffffffffffffffffffffffffffffff16311015610814576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080b90610fd4565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff168260405161083a90610ef2565b60006040518083038185875af1925050503d8060008114610877576040519150601f19603f3d011682016040523d82523d6000602084013e61087c565b606091505b50509050806108c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b790610fb4565b60405180910390fd5b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610935576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092c90610f74565b60405180910390fd5b60008111610978576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096f90611094565b60405180910390fd5b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054146109fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f190611054565b60405180910390fd5b6005829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600154610aaf9190611168565b6001819055507f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac8282604051610ae6929190610f4b565b60405180910390a15050565b6000610b05610b00846110f4565b6110cf565b90508083825260208201905082856020860282011115610b2457600080fd5b60005b85811015610b545781610b3a8882610bca565b845260208401935060208301925050600181019050610b27565b5050509392505050565b6000610b71610b6c84611120565b6110cf565b90508083825260208201905082856020860282011115610b9057600080fd5b60005b85811015610bc05781610ba68882610c48565b845260208401935060208301925050600181019050610b93565b5050509392505050565b600081359050610bd9816116c0565b92915050565b600081359050610bee816116d7565b92915050565b600082601f830112610c0557600080fd5b8135610c15848260208601610af2565b91505092915050565b600082601f830112610c2f57600080fd5b8135610c3f848260208601610b5e565b91505092915050565b600081359050610c57816116ee565b92915050565b600060208284031215610c6f57600080fd5b6000610c7d84828501610bca565b91505092915050565b600060208284031215610c9857600080fd5b6000610ca684828501610bdf565b91505092915050565b60008060408385031215610cc257600080fd5b600083013567ffffffffffffffff811115610cdc57600080fd5b610ce885828601610bf4565b925050602083013567ffffffffffffffff811115610d0557600080fd5b610d1185828601610c1e565b9150509250929050565b600060208284031215610d2d57600080fd5b6000610d3b84828501610c48565b91505092915050565b610d4d816112cb565b82525050565b610d5c8161127d565b82525050565b6000610d6f602c83611157565b9150610d7a82611419565b604082019050919050565b6000610d92602683611157565b9150610d9d82611468565b604082019050919050565b6000610db5603a83611157565b9150610dc0826114b7565b604082019050919050565b6000610dd8601d83611157565b9150610de382611506565b602082019050919050565b6000610dfb602b83611157565b9150610e068261152f565b604082019050919050565b6000610e1e602e83611157565b9150610e298261157e565b604082019050919050565b6000610e41603283611157565b9150610e4c826115cd565b604082019050919050565b6000610e6460008361114c565b9150610e6f8261161c565b600082019050919050565b6000610e87602b83611157565b9150610e928261161f565b604082019050919050565b6000610eaa601a83611157565b9150610eb58261166e565b602082019050919050565b6000610ecd601d83611157565b9150610ed882611697565b602082019050919050565b610eec816112c1565b82525050565b6000610efd82610e57565b9150819050919050565b6000602082019050610f1c6000830184610d53565b92915050565b6000604082019050610f376000830185610d44565b610f446020830184610ee3565b9392505050565b6000604082019050610f606000830185610d53565b610f6d6020830184610ee3565b9392505050565b60006020820190508181036000830152610f8d81610d62565b9050919050565b60006020820190508181036000830152610fad81610d85565b9050919050565b60006020820190508181036000830152610fcd81610da8565b9050919050565b60006020820190508181036000830152610fed81610dcb565b9050919050565b6000602082019050818103600083015261100d81610dee565b9050919050565b6000602082019050818103600083015261102d81610e11565b9050919050565b6000602082019050818103600083015261104d81610e34565b9050919050565b6000602082019050818103600083015261106d81610e7a565b9050919050565b6000602082019050818103600083015261108d81610e9d565b9050919050565b600060208201905081810360008301526110ad81610ec0565b9050919050565b60006020820190506110c96000830184610ee3565b92915050565b60006110d96110ea565b90506110e58282611301565b919050565b6000604051905090565b600067ffffffffffffffff82111561110f5761110e6113d9565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561113b5761113a6113d9565b5b602082029050602081019050919050565b600081905092915050565b600082825260208201905092915050565b6000611173826112c1565b915061117e836112c1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156111b3576111b261137b565b5b828201905092915050565b60006111c9826112c1565b91506111d4836112c1565b9250826111e4576111e36113aa565b5b828204905092915050565b60006111fa826112c1565b9150611205836112c1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561123e5761123d61137b565b5b828202905092915050565b6000611254826112c1565b915061125f836112c1565b9250828210156112725761127161137b565b5b828203905092915050565b6000611288826112a1565b9050919050565b600061129a826112a1565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006112d6826112dd565b9050919050565b60006112e8826112ef565b9050919050565b60006112fa826112a1565b9050919050565b61130a82611408565b810181811067ffffffffffffffff82111715611329576113286113d9565b5b80604052505050565b600061133d826112c1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156113705761136f61137b565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f5061796d656e7453706c69747465723a206163636f756e74206973207468652060008201527f7a65726f20616464726573730000000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a206163636f756e7420686173206e6f2060008201527f7368617265730000000000000000000000000000000000000000000000000000602082015250565b7f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260008201527f6563697069656e74206d61792068617665207265766572746564000000000000602082015250565b7f416464726573733a20696e73756666696369656e742062616c616e6365000000600082015250565b7f5061796d656e7453706c69747465723a206163636f756e74206973206e6f742060008201527f647565207061796d656e74000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a2070617965657320616e64207368617260008201527f6573206c656e677468206d69736d617463680000000000000000000000000000602082015250565b50565b7f5061796d656e7453706c69747465723a206163636f756e7420616c726561647960008201527f2068617320736861726573000000000000000000000000000000000000000000602082015250565b7f5061796d656e7453706c69747465723a206e6f20706179656573000000000000600082015250565b7f5061796d656e7453706c69747465723a20736861726573206172652030000000600082015250565b6116c98161127d565b81146116d457600080fd5b50565b6116e08161128f565b81146116eb57600080fd5b50565b6116f7816112c1565b811461170257600080fd5b5056fea2646970667358221220c4d225a92ac9a093997c916dc5f5d03ab9183d0efd715359cdc089793cc1e87a64736f6c63430008040033";

export class PaymentSplitterInitializable__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PaymentSplitterInitializable> {
    return super.deploy(
      overrides || {}
    ) as Promise<PaymentSplitterInitializable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PaymentSplitterInitializable {
    return super.attach(address) as PaymentSplitterInitializable;
  }
  connect(signer: Signer): PaymentSplitterInitializable__factory {
    return super.connect(signer) as PaymentSplitterInitializable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentSplitterInitializableInterface {
    return new utils.Interface(_abi) as PaymentSplitterInitializableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PaymentSplitterInitializable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PaymentSplitterInitializable;
  }
}
