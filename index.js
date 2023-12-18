const didResolver = require("did-resolver");
const webDidResolver = require("web-did-resolver");
const webResolver = webDidResolver.getResolver();
const didJwtVc = require("did-jwt-vc");

const vcjsonData = require("./vcData.json");

const resolver = new didResolver.Resolver({
  ...webResolver,
});

function verifyCreds() {
  vcjsonData.map(async (vcRecord) => {
    // if (vcRecord.expireDate < Today) return false;
    // if (revoked) return false;
    const verifiedVC = await didJwtVc.verifyCredential(
      vcRecord.proof.jwt,
      resolver
    );
    console.log(
      `Smallholder Id: ${vcRecord.credentialSubject.smallHolderId}, verified: ${verifiedVC.verified}`
    );
    // console.log(verifiedVC); // for more info on the verification details
  });
}

verifyCreds();
