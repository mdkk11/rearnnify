import type { Article } from "@/db/schema";

export function buildSlidePrompt(article: Pick<Article, "title" | "sourceBody">) {
  return `記事タイトル: ${article.title}

記事本文:
${article.sourceBody}

上の記事本文だけを根拠に、読者が記事全体の要点を短時間で復習できる要約スライドを3〜6枚作成してください。
各スライドは短く読みやすい title と content を持ちます。
記事本文にない内容を過度に補完しないでください。`;
}

export function buildQuizPrompt(article: Pick<Article, "title" | "sourceBody">) {
  return `記事タイトル: ${article.title}

記事本文:
${article.sourceBody}

上の記事本文だけを根拠に、理解度確認用の4択クイズを3〜5問作成してください。
各クイズは question, choices, correctChoiceIndex, explanation を持ちます。
correctChoiceIndex は choices の0-based indexです。
ひっかけ問題にしすぎず、学習定着を目的にしてください。`;
}
