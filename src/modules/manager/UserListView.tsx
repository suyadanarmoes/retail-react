import api from "@/api";
import { UserDatatTable } from "./chunks/userListData-table";
import { userlistcolumns } from "./chunks/userListColumns";

const UserListView = () => {
  const { data: user } = api.user?.getalluser.useQuery() ?? {};
  return (
    <div>
      <h1 className="text-3xl font-bold ml-10 ">User Lists 📜</h1>

      <UserDatatTable columns={userlistcolumns} data={user ?? []} />
    </div>
  );
};

export default UserListView;