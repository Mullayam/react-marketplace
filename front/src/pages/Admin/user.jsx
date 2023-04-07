import React from "react";
import { Table, Popover, Button } from "antd";
import moment from "moment";
import UserInfo from "../../helpers/UserInfo";
import { UpdateUsersStatus } from "../../services/user";
import { toast } from "react-hot-toast";
import { GetAllUsers } from "../../services/user";
const content = {
  active: () => {
    return (
      <div>
        <p>Mark as Unactive or Ban User</p>
      </div>
    );
  },
  unactive: () => {
    return (
      <div>
        <p>Mark as User Active</p>
      </div>
    );
  },
  blocked: () => {
    return (
      <div>
        <p> Mark as User Active</p>
        <p>Click To Unblock</p>
      </div>
    );
  },
};

export default function Users() {
  const [allUsers, setAllUsers] = React.useState([]);

  const UpdateStatusOfUsers = async (id, Status) => {
    try {
      const response = await UpdateUsersStatus(id, Status);
      if (response.success) {
        toast.success(response.message);
        FetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchUsers = async () => {
    try {
      const users = await GetAllUsers();

      if (users.success) {
        setAllUsers(users.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, records) => {
        return records.status.toUpperCase();
      },
    },
    {
      title: "SignUp On",
      dataIndex: "createdAt",
      render: (text, data) => {
        return moment(data.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        const { status, _id } = record;

        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span>
                <Popover
                  content={content.unactive}
                  title={`Current Status: ${record.status.toUpperCase()}`}
                >
                  <Button
                    onClick={() => UpdateStatusOfUsers(_id, "unactive")}
                    className="cursor-pointer"
                  >
                    UnActive
                  </Button>
                </Popover>
              </span>
            )}
            {status === "active" && (
              <span>
                <Popover
                  content={content.active()}
                  title={`Current Status: ${record.status.toUpperCase()}`}
                >
                  <Button
                    onClick={() => UpdateStatusOfUsers(_id, "blocked")}
                    className="cursor-pointer"
                  >
                    Block
                  </Button>
                </Popover>
              </span>
            )}
            {status === "unactive" && (
              <span>
                <Popover
                  content={content.active}
                  title={`Current Status: ${record.status.toUpperCase()}`}
                >
                  <Button
                    type="default"
                    onClick={() => UpdateStatusOfUsers(_id, "active")}
                    className="cursor-pointer"
                  >
                    Mark As Active
                  </Button>
                </Popover>
              </span>
            )}

            {status === "blocked" && (
              <span>
                <Popover
                  content={content.blocked}
                  title={`Current Status: ${record.status.toUpperCase()}`}
                >
                  <Button
                    onClick={() => UpdateStatusOfUsers(_id, "active")}
                    className="cursor-pointer"
                  >
                    Active
                  </Button>
                </Popover>
              </span>
            )}
            {/* <i onClick={() => {}} className="ri-edit-line"></i> */}
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    FetchUsers();
  }, []);
  return (
    <div>
      <Table key={Math.random() * 10} columns={Columns} dataSource={allUsers} />
    </div>
  );
}
