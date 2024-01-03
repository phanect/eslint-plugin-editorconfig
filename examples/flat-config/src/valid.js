import { fetch } from "undici";

const res = await fetch("https://example.com");

try {
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.error(err);
  process.exit(1);
}
