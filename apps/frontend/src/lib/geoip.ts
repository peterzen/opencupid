import axios from "axios"
import z from "zod"


export const IpInfoSchema = z.object({
  ip: z.string(),
  ip_decimal: z.number(),
  country: z.string(),
  country_eu: z.boolean(),
  country_iso: z.string().length(2),
  city: z.string(),
  hostname: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  asn: z.string(),
  asn_org: z.string(),
  user_agent: z.object({
    product: z.string(),
    version: z.string(),
    comment: z.string(),
    raw_value: z.string(),
  }),
})

export type IpInfo = z.infer<typeof IpInfoSchema>

export default async function fetchGeoIpInfo(): Promise<string> {
  const geoipUrl = __APP_CONFIG__?.GEOIP_URL
  if (!geoipUrl) {
    throw new Error('GEOIP_URL is not defined in __APP_CONFIG__')
  }

  const response = await axios.get<IpInfo>(geoipUrl)
  console.log('GeoIP response:', response.data)
  if (!response.data) {
    throw new Error(`Failed to fetch GeoIP info: ${response.statusText}`)
  }

  const ipInfo = IpInfoSchema.safeParse(response.data)
  if (!ipInfo.success) {
    return ''
  }
  return ipInfo.data.country_iso
}