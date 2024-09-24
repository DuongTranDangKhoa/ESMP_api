export default function getEnvConfig(): { [key: string]: string } {
  const env: any = {}
  Object.keys(Bun.env).forEach((key: string) => {
    env[key] = Bun.env[key]
  })
  return env
}

export const env = getEnvConfig()
