import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const Post = () => {
  const router = useRouter();
  const utils = trpc.useContext();

  const [inputValues, setInputValues] = useState({
    content: "",
    postId: router.query.post as string,
  });

  const [post, comments] = trpc.useQueries((t) => {
    return [
      t.post.getById(
        {
          id: router.query.post as string,
        },
        {
          enabled: !!router.query.post,
        }
      ),
      t.post.getComments(
        {
          postId: router.query.post as string,
        },
        {
          enabled: !!router.query.post,
        }
      ),
    ];
  });
  const { mutate } = trpc.post.createComment.useMutation({
    onSuccess: () => {
      utils.post.getComments.invalidate();
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold text-red-700">
        {post.data?.title}
      </h1>
      <p className="text-md text-blue-600">{post.data?.text}</p>
      <div>
        <h1 className="text-2xl font-semibold text-green-700">
          ALL POST COMMENTS
          <div className="border-2 border-dashed border-blue-600">
            {comments.data?.length ? (
              comments.data?.map((comment) => {
                return (
                  <div key={comment.id}>
                    <p className="text-md text-blue-600">{comment.text}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-md text-blue-600">No comments yet</p>
            )}
          </div>
        </h1>
        <form className="mx-auto flex max-w-xs flex-col">
          <input
            placeholder="input your comment here"
            value={inputValues.content}
            onChange={(e) => {
              setInputValues({ ...inputValues, content: e.target.value });
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              mutate({
                content: inputValues.content,
                postId: inputValues.postId,
              });
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
