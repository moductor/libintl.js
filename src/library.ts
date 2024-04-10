import { existsSync, readdirSync } from "fs";
import { IKoffiLib, load } from "koffi";
import { basename } from "path";

let lib: IKoffiLib | undefined;
export function init(file?: string): void {
  if (lib) return;
  file ??= getLibFile();

  if (!file) throw new Error("error finding a library file");
  lib = load(file);
}

export function getLib(): IKoffiLib {
  init();
  return lib!;
}

function getLibFile() {
  const platform = getPlatformName();
  return findLibFile(dirs[platform], extensions[platform]);
}

function getPlatformName() {
  if (process.platform === "win32") {
    return "windows";
  } else if (process.platform === "darwin") {
    return "macos";
  }
  return "linux";
}

function findLibFile(paths: string[], extension: string) {
  return listFiles(paths).find((file) => {
    const name = basename(file);
    for (const lib of libs) {
      if (name.startsWith(`${lib}.${extension}`)) return true;
    }
    return false;
  });
}

function listFiles(paths: string[]) {
  const files: string[] = [];
  paths
    .filter((path) => existsSync(path))
    .forEach((dir) => files.push(...readdirSync(dir)));
  return files;
}

const libs = ["libglib-2.0", "libintl", "libc"];

const dirs = {
  linux: ["/usr/lib64", "/usr/local/lib64", "/usr/lib", "/usr/local/lib"],
  windows: process.env["PATH"]!.split(";"),
  macos: ["/usr/lib", "/usr/local/lib"],
};

const extensions = {
  linux: "so",
  windows: "dll",
  macos: "dylib",
};
