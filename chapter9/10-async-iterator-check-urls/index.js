import { CheckUrls } from "./checkUrls.js";

async function main() {
  const checkUrls = new CheckUrls([
    'https://examples.com',
    'https://mustbedownforsurehopfully.com'
  ])

  for await (const status of checkUrls) {
    console.log(status)
  } 
}

main()