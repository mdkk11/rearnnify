import { Button } from "@/components/ui/button";
import { Field, FieldLabel, Input, Textarea } from "@/components/ui/input";
import type { Article } from "@/db/schema";

type ArticleFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  article?: Pick<Article, "title" | "sourceUrl" | "sourceBody">;
  submitLabel: string;
};

export function ArticleForm({ action, article, submitLabel }: ArticleFormProps) {
  return (
    <form action={action} className="form-grid">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          name="title"
          placeholder="React Queryの記事"
          required
          defaultValue={article?.title ?? ""}
        />
      </Field>
      <Field>
        <FieldLabel>Source URL</FieldLabel>
        <Input
          name="sourceUrl"
          placeholder="https://example.com/articles/react-query"
          type="url"
          defaultValue={article?.sourceUrl ?? ""}
        />
      </Field>
      <Field>
        <FieldLabel>Source body snapshot</FieldLabel>
        <Textarea
          name="sourceBody"
          placeholder="AI生成に使う記事本文を貼り付け"
          required
          defaultValue={article?.sourceBody ?? ""}
        />
      </Field>
      <div className="form-actions">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
