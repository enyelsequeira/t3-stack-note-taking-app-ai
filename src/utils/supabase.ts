import type { Database } from "@/types/dbschema";
import { createClient } from "@supabase/supabase-js";

// const URL = "https://qsmdnguxvzpxtbtlehkw.supabase.co";
const URL = "https://yyczqylqwgeycvvezbpy.supabase.co";
// const KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbWRuZ3V4dnpweHRidGxlaGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NTkyODIsImV4cCI6MTk5MDMzNTI4Mn0.yhog_g-N1VM6JGRfA7lCmAJB4hhHu0ryetZJpmfsR4Q";

const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Y3pxeWxxd2dleWN2dmV6YnB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMzUxOTQsImV4cCI6MTk4NzkxMTE5NH0._0mauLObrsqLKtJnpwQaekQY-BSKO_NFl-b1yBvM7i0";
const service_rol =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbWRuZ3V4dnpweHRidGxlaGt3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDc1OTI4MiwiZXhwIjoxOTkwMzM1MjgyfQ.J07AYX_UEI6WgUx4drT7p5_KQO4IC7J6qDzxZNBijYg";
export const supabase = createClient<Database>(URL, KEY);
// const { data, error } = supabase.storage
//   .from("testing")
//   .list()
//   .then((res) => {
//     console.log("🚀 ~ file: index.tsx ~ line 18 ~ Home:NextPage ~ error", res);
//   });
