import "./App.css";
import "./style.css";
import Transaction from "./chain/Transaction";
import BlockChain from "./chain/BlockChain";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

function App() {
  const publicKeys = {
    "0460e898bccd70898b49a173aff016ca6c1458f22d155fb481a16d63690a3dce6997a8905d2c40d595b8d9b7b45f8e03d493e5689f405e834dea1b6a05978118a7":
      "user1",
    "0462e1104a2e8f297cb30111207ad8c615e63c5ae050313a7d8dcabb4cf41c54642f035b326e59acff17844cd8dacf6f2177a52407aa9dd67cde1763873d59644b":
      "user2",
    "04fb58fa0ac8fe0313218730bc947ef3ac0e914085b1a72df535b2ef32dd59c28f1b9d53447d04e354682c87ccd3fc0f736405540f14b62b245202aed872949470":
      "user3",
    "04e928ddb4753acc4f5baf9d820fd476d793e05825b26d31c1a8d318af8e2a7e7ea97bb1954f14119450a0bd8ccb8af430e10b90427ed8866ee98478e56e07765f":
      "user4",
    "0458862308121d21ec2e55c9696ec36f05ca55994ffc8ceae92dffcbdeee300c7bb15a1d744114d74b6cf0ef0184de9c760512839e849ad57136bcaffdcd93efe6":
      "user5",
    "0452d2b64f992db469a6d6c2dde1aa0042c699dd004de3297c3441beab4cd9339ab3785e26e91197d1c137be74e0374fda38f5153adbfeed6d4d1bb843bb274a44":
      "user6",
    "049da13cb5844336ee38cb43dacd05f39b102afe33dc0ce47538711d959490538b8e2db935ea9f0e09d7d70893ae82bc467bbf8ba05e65373b2d7e513aed8ec0f2":
      "user7",
    "040cb41ad0235393947d75219abc43860d429e6b2ba7ac52c9c8ce7192256a93f791441c4704508aa625304e1f35de5114be9f9731064e2e92604db2ff5a57e0dd":
      "user8",
    "04156f78520db86152159705f34db69f528f89d09a46c38a800f3b9d86fa2bfa78a15f0377bb1f672aef001b462b7247f29701bce150eac6f568d794d471b1f654":
      "user9",
    "045f0ed96f03039d201978d0d7c9d1394f235015df5b6b8d425e6934487426f755dfe769ece0b3174560d2ca9bb30aa6721c3c4903d8c928f111b3dddd96a97a89":
      "user10",
  };
  const [belgeTuru, setBelgeTuru] = useState("");
  const [kisi, setKisi] = useState("");
  const [fileName, setFileName] = useState("");
  const [res, setRes] = useState("");
  const [notify, setNotify] = useState(false);
  const [code, setCode] = useState(""); // kisinin public keyi
  const [belge, setBelge] = useState([]);

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const file = useRef(null);
  const key = useRef(null);
  const socket = useRef(null);
  const blockChain = useRef(null);

  const send = (e) => {
    e.preventDefault();
    if (fileName === "" || belgeTuru === "" || kisi === "") {
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      setRes(e.target.result);
    };
    reader.readAsDataURL(fileName);
  };

  useEffect(() => {
    if (res !== "") {
      console.log("trans blogu");
      let timer = new Date();
      let tx1 = new Transaction(
        key.current.getPublic("hex"),
        [Object.keys(publicKeys).find((key) => publicKeys[key] === kisi)],
        {
          data: res,
          fName: fileName.name,
        }
      );

      tx1.signTransaction(key.current);
      blockChain.current.addTransaction(tx1);
      blockChain.current.minePendingTransactions();
      socket.current.emit(
        "get-chain",
        JSON.stringify(blockChain.current.chain)
      );
      opt1.current.selected = "select";
      opt2.current.selected = "select";
      file.current.value = "";
      setRes("");
      setNotify(true);
      setTimeout(() => setNotify(false), 4000);
      console.log("trans blogu sonu : ", (new Date() - timer) / 1000);
    }
  }, [res]);

  useEffect(() => {
    // kod atamasi
    let res = prompt("kisi kodu girin");
    if (res !== null && res !== "") {
      setCode(res);
    }
  }, []);

  useEffect(() => {
    if (!code) return;
    console.log("socket.current :", socket.current);
    socket.current = io("http://localhost:5000/", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    blockChain.current = new BlockChain("null");
    console.log("socket.current :", socket.current.blockChain);
    key.current = ec.keyFromPrivate(
      code + "6abc91f1cd74bcfccc5b0508f6d7e019d114e2e99139a2d11ff362cd6ffc82c"
    );
    console.log("code : ", code);
    console.log("key : ", key.current.getPublic("hex"));
    socket.current.on("request-chain", (chain) => {
      console.log("request blogu");
      let timer = new Date();
      console.log("blockchain :", blockChain.current.chain);
      blockChain.current.chain = JSON.parse(chain);
      console.log("block Chain : ", JSON.parse(chain));
      let tempArray = blockChain.current.chain.filter((el) => {
        return (
          el.transactions[0]?.receivers[0] === key.current.getPublic("hex")
        );
      });
      setBelge(tempArray);
      console.log("request blogu zamani : ", (new Date() - timer) / 1000);
    });

    socket.current.on("send-chain", (chain) => {
      console.log("send blogu");
      let timer = new Date();
      blockChain.current.chain = JSON.parse(chain);
      console.log("All chain", JSON.parse(chain));
      let tempArray = blockChain.current.chain.filter((el) => {
        console.log();
        return (
          el.transactions[0]?.receivers[0] === key.current.getPublic("hex")
        );
      });
      setBelge(tempArray);
      console.log("send blogu zamani : ", (new Date() - timer) / 1000);
    });
  }, [code]);

  return (
    <div className="App">
      <div className="container">
        <form className="form-inline">
          <label htmlFor="paper-type">Belge Türü</label>
          <select
            defaultValue={"default"}
            onChange={(e) => setBelgeTuru(e.target.value)}
            name="paper-type"
            id="paper-type"
          >
            <option ref={opt1} value="default" disabled hidden>
              Belge Türü Seçiniz...
            </option>
            <option value="obelgesi">Örnek Belge</option>
            <option value="transkript">Örnek Belge 2</option>
          </select>

          <label htmlFor="kisi">Gönderilecek Kişi</label>
          <select
            defaultValue={"default"}
            onChange={(e) => setKisi(e.target.value)}
            name="kisi"
            id="kisi"
          >
            <option ref={opt2} value="default" disabled hidden>
              Kişi Seçiniz...
            </option>
            {Object.keys(publicKeys).map((el) => {
              if (el !== key?.current?.getPublic("hex")) {
                //console.log("Current : ",key.current.getPublic("hex"));
                return (
                  <option key={el} value={publicKeys[el]}>
                    {
                      { user1: "User 1", user2: "User2", user3: "User 3",
                      user4: "User 4", user5: "User4", user5: "User 5",
                      user6: "User 6", user7: "User7", user8: "User 8",
                      user9: "User 9", user10: "User10",}[
                        publicKeys[el]
                      ]
                    }
                  </option>
                );
              }
            })}
          </select>

          <label htmlFor="belge-yukleme">Belge Yükle:</label>
          <input
            ref={file}
            onChange={(e) => setFileName(e.target.files[0])}
            type="file"
            name="belge-yukleme"
            accept=".pdf"
            id="belge-yukleme"
          />

          <button onClick={send} type="submit">
            Gönder
          </button>
          {notify && (
            <div id="notify">{`${fileName.name} adlı dosya ${kisi} adlı kişiye gönderildi!`}</div>
          )}
        </form>

        <div className="right">
          {belge.map((eleman, index) => {
            return (
              <div key={index} className="def">
                <a
                  href={eleman.transactions[0].data.data}
                  target="_self"
                  download={eleman.transactions[0].data.fName + ".pdf"}
                >
                  <p>{eleman.transactions[0].data.fName}</p>
                </a>
                <p>{publicKeys[eleman.transactions[0].sender]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
