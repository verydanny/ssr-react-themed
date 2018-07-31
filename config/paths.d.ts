type Paths = {
  clientBuild: string,
  serverBuild: string,
  dotenv: string,
  src: string,
  srcClient: string,
  srcServer: string,
  publicPath: string,
  resolveModules?: string[]
}

declare const paths: Paths

export default paths