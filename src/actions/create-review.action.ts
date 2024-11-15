"use server";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString(); //있을때만 toString으로 변경
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error: ", errorData);
      return;
    }
    console.log("response : ", response);
  } catch (err) {
    console.error(err);
    return;
  }
}
