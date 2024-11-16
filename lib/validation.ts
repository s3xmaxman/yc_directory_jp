import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "タイトルは3文字以上で入力してください" })
    .max(100, { message: "タイトルは100文字以内で入力してください" }),
  description: z
    .string()
    .min(20, { message: "説明は20文字以上で入力してください" })
    .max(500, { message: "説明は500文字以内で入力してください" }),
  category: z
    .string()
    .min(3, { message: "カテゴリーは3文字以上で入力してください" })
    .max(20, { message: "カテゴリーは20文字以内で入力してください" }),
  link: z
    .string()
    .url({ message: "有効なURLを入力してください" })
    .refine(
      async (url) => {
        try {
          const res = await fetch(url, { method: "HEAD" });
          const contentType = res.headers.get("content-type");

          return contentType?.startsWith("image/");
        } catch {
          return false;
        }
      },
      { message: "有効な画像URLを入力してください" }
    ),
  pitch: z
    .string()
    .min(10, { message: "ピッチは10文字以上で入力してください" }),
});
