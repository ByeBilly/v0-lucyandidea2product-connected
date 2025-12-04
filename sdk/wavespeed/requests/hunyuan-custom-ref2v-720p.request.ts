import { z } from "zod"
import { BaseRequest } from "../base"

const HunyuanCustomRef2v720pSchema = z.object({
  enable_safety_checker: z.boolean().default(true).describe("Whether to enable the safety checker."),
  flow_shift: z
    .number()
    .min(1)
    .max(20)
    .default(13)
    .describe("The shift value for the timestep schedule for flow matching."),
  guidance_scale: z.number().min(1.01).max(10).default(7.5).describe("The guidance scale for generation."),
  image: z.string().describe("The image for generating the output."),
  negative_prompt: z.string().default("").describe("The negative prompt for generating the output."),
  prompt: z.string(),
  seed: z.number().int().default(-1).describe("The seed for random number generation."),
  size: z.enum(["1280*720", "720*1280"]).default("1280*720").describe("The size of the output."),
})

export class HunyuanCustomRef2v720pRequest extends BaseRequest<typeof HunyuanCustomRef2v720pSchema> {
  protected schema = HunyuanCustomRef2v720pSchema

  static create(
    prompt: string,
    image: string,
    options?: {
      enable_safety_checker?: boolean
      flow_shift?: number
      guidance_scale?: number
      negative_prompt?: string
      seed?: number
      size?: "1280*720" | "720*1280"
    },
  ) {
    const request = new HunyuanCustomRef2v720pRequest()
    request.data = {
      prompt,
      image,
      enable_safety_checker: options?.enable_safety_checker ?? true,
      flow_shift: options?.flow_shift ?? 13,
      guidance_scale: options?.guidance_scale ?? 7.5,
      negative_prompt: options?.negative_prompt ?? "",
      seed: options?.seed ?? -1,
      size: options?.size ?? "1280*720",
    }
    return request
  }

  getModelUuid(): string {
    return "wavespeed-ai/hunyuan-custom-ref2v-720p"
  }

  getModelType(): string {
    return "image-to-video"
  }

  getDefaultParams(): Record<string, any> {
    return {}
  }

  getFeatureCalculator(): string {
    return "1"
  }
}
