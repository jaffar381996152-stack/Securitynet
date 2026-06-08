import { describe, it, expect } from "vitest";
import {
  isValidWalletAddress,
  isValidTxHash,
  isValidEmail,
  isValidAmount,
  isValidPostTitle,
  isValidPostContent,
} from "./validators";

const EVM_ADDRESS = "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0";
const TRON_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const EVM_TX_HASH = "0x" + "a".repeat(64);
const TRON_TX_HASH = "b".repeat(64);

describe("isValidWalletAddress", () => {
  it("accepts a well-formed EVM address for BSC/ETH", () => {
    expect(isValidWalletAddress(EVM_ADDRESS, "BSC")).toBe(true);
    expect(isValidWalletAddress(EVM_ADDRESS, "ETH")).toBe(true);
    expect(isValidWalletAddress(EVM_ADDRESS)).toBe(true);
  });

  it("accepts a well-formed TRON address only when network is TRON", () => {
    expect(isValidWalletAddress(TRON_ADDRESS, "TRON")).toBe(true);
    expect(isValidWalletAddress(TRON_ADDRESS, "BSC")).toBe(false);
  });

  it("rejects malformed, empty, or non-string input", () => {
    expect(isValidWalletAddress("0xnothex", "BSC")).toBe(false);
    expect(isValidWalletAddress(EVM_ADDRESS.slice(0, -1), "BSC")).toBe(false);
    expect(isValidWalletAddress("", "BSC")).toBe(false);
    expect(isValidWalletAddress(null, "BSC")).toBe(false);
    expect(isValidWalletAddress(undefined, "TRON")).toBe(false);
    expect(isValidWalletAddress(12345, "BSC")).toBe(false);
  });
});

describe("isValidTxHash", () => {
  it("accepts a well-formed EVM tx hash for BSC/ETH", () => {
    expect(isValidTxHash(EVM_TX_HASH, "BSC")).toBe(true);
    expect(isValidTxHash(EVM_TX_HASH, "ETH")).toBe(true);
  });

  it("accepts a well-formed TRON tx hash only when network is TRON", () => {
    expect(isValidTxHash(TRON_TX_HASH, "TRON")).toBe(true);
    expect(isValidTxHash(TRON_TX_HASH, "BSC")).toBe(false);
  });

  it("rejects malformed, empty, or non-string input", () => {
    expect(isValidTxHash("0xabc", "BSC")).toBe(false);
    expect(isValidTxHash(EVM_TX_HASH.slice(0, -1), "BSC")).toBe(false);
    expect(isValidTxHash("", "TRON")).toBe(false);
    expect(isValidTxHash(null, "BSC")).toBe(false);
    expect(isValidTxHash({}, "TRON")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("first.last+tag@sub.example.co")).toBe(true);
  });

  it("rejects malformed, empty, or non-string input", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing@domain")).toBe(false);
    expect(isValidEmail("@no-local.com")).toBe(false);
    expect(isValidEmail("has space@example.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(42)).toBe(false);
  });
});

describe("isValidAmount", () => {
  it("accepts positive finite numbers within range, including numeric strings", () => {
    expect(isValidAmount(15)).toBe(true);
    expect(isValidAmount("15")).toBe(true);
    expect(isValidAmount(0.2)).toBe(true);
    expect(isValidAmount(1_000_000)).toBe(true);
  });

  it("rejects zero, negative, non-numeric, infinite, and out-of-range values", () => {
    expect(isValidAmount(0)).toBe(false);
    expect(isValidAmount(-5)).toBe(false);
    expect(isValidAmount("not-a-number")).toBe(false);
    expect(isValidAmount(Infinity)).toBe(false);
    expect(isValidAmount(NaN)).toBe(false);
    expect(isValidAmount(1_000_001)).toBe(false);
    expect(isValidAmount(null)).toBe(false);
    expect(isValidAmount(undefined)).toBe(false);
  });

  it("respects a custom max", () => {
    expect(isValidAmount(50, 100)).toBe(true);
    expect(isValidAmount(150, 100)).toBe(false);
  });
});

describe("isValidPostTitle", () => {
  it("accepts non-empty strings up to 200 characters", () => {
    expect(isValidPostTitle("The Future of AI Security")).toBe(true);
    expect(isValidPostTitle("a".repeat(200))).toBe(true);
  });

  it("rejects empty, whitespace-only, oversized, or non-string titles", () => {
    expect(isValidPostTitle("")).toBe(false);
    expect(isValidPostTitle("   ")).toBe(false);
    expect(isValidPostTitle("a".repeat(201))).toBe(false);
    expect(isValidPostTitle(null)).toBe(false);
    expect(isValidPostTitle(123)).toBe(false);
  });
});

describe("isValidPostContent", () => {
  it("accepts a non-empty array of blocks within the size caps", () => {
    expect(isValidPostContent([{ type: "text", value: "hello" }])).toBe(true);
    expect(
      isValidPostContent([
        { type: "heading", value: "Intro" },
        { type: "text", value: "a".repeat(100_000) },
      ])
    ).toBe(true);
  });

  it("rejects non-arrays, empty arrays, and arrays over 300 blocks", () => {
    expect(isValidPostContent("not an array")).toBe(false);
    expect(isValidPostContent([])).toBe(false);
    expect(isValidPostContent(Array.from({ length: 301 }, () => ({ type: "text", value: "x" })))).toBe(false);
  });

  it("rejects any block whose value exceeds 100,000 characters", () => {
    expect(isValidPostContent([{ type: "text", value: "a".repeat(100_001) }])).toBe(false);
    expect(
      isValidPostContent([
        { type: "text", value: "fine" },
        { type: "raw", value: "b".repeat(100_001) },
      ])
    ).toBe(false);
  });

  it("tolerates blocks without a string value (shape validation lives in sanitizePostContent)", () => {
    expect(isValidPostContent([{ type: "image" }])).toBe(true);
  });
});
