import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { tableIcons } from "../../icons/tableIcon";
import { useQuery } from "react-apollo";
import AddBox from "@material-ui/icons/AddBox";
import { CREATEORS_REQUEST_LIST } from "../../apollo/gql/gql";
import { MoreHoriz } from "@material-ui/icons";
import AdminModal from "../../common/adminModal";

const Admin = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [userInfor, setUserInfor] = useState();
  const [toggle, setToggle] = useState(false);
  const [datas, setDatas] = useState();

  // 크리에이터 요청 신청 리스트
  const { loading, error, data, refetch } = useQuery(CREATEORS_REQUEST_LIST, {
    fetchPolicy: "no-cache",
    variables: {
      condition: {
        where: "status=1",
        order_by: {
          field: "created_at",
          order: "DESC",
        },
        offset: 0,
        limit: 10,
      },
    },
  });

  useEffect(() => {
    if (data) {
      setUserInfor(data.get_creators.map((item) => item));
    }
  }, [data]);

  const columns = [
    {
      title: "이미지",
      field: "imageUrl",
      render: (rowData) => (
        <img
          // src={`https://s3-idnd-prd-an2-pub.s3.ap-northeast-2.amazonaws.com/profile/origin/${data.get_creators.map(
          //   (item) => item.user.images[0].name[0]
          // )}`}
          src="../img/userImg.png"
          style={{ width: 40, borderRadius: "50%" }}
          alt="userLogo"
        />
      ),
    },
    {
      title: "이름",
      field: "user.nickname",
    },
    {
      title: "등급",
      field: "tier",
    },
    // {
    //   title: "등록일",
    //   field: "created_at",
    // },
    {
      title: "정보",
      field: "intro",
    },
    {
      title: "가입입",
      field: "created_at",
      render: (rowData) => (
        <h1 className="ok">
          <h1>{time(rowData.created_at)}</h1>
        </h1>
      ),
    },
    {
      title: "더보기",
      field: "imageUrl",
      render: (rowData) => <MoreHoriz />,
    },
  ];

  const time = (date1) => {
    var date = new window.Date(date1);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " ";
  };

  if (loading) return "Loading...";
  if (error) return "Error";

  return (
    <>
      <div className="productWrap">
        <MaterialTable
          //   style={{ width: "100%" }}
          title={" 관리자 "}
          columns={columns}
          icons={tableIcons}
          data={userInfor}
          onSelectionChange={(data) => setSelectedRow(data)}
          onRowClick={(event, rowData) => {
            setToggle(!toggle);
            setDatas(rowData);
          }}
          options={{
            sorting: false,
            searchFieldAlignment: "left",
            searchAutoFocus: true,
            paging: true,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50],
            selection: true,
            showTextRowsSelected: false,
            // rowStyle: (rowData) => ({
            //   backgroundColor:
            //     selectedRow === rowData.tableData.id ? "#6ABAC9" : "#FFF",
            // }),
            // filtering: true,
            // actionsColumnIndex: -1,
          }}
          actions={[
            // {
            //   icon: () => (
            //     <Select
            //       labelId="demo-simple-select-label"
            //       id="demo-simple-select"
            //       style={{ width: 100 }}
            //       // value={age}
            //       // onChange={handleChange}
            //     >
            //       <MenuItem value={10}>All</MenuItem>
            //       <MenuItem value={20}>등록 요청대기</MenuItem>
            //       <MenuItem value={30}>수정 요청대기</MenuItem>
            //     </Select>
            //   ),
            //   tooltip: "상품 종류",
            //   isFreeAction: true,
            // },
            {
              icon: () => <AddBox></AddBox>,
              tooltip: "관리자",
              isFreeAction: false,
              onClick: async (e) => {
                // console.log(
                //   "확인중@@!!",
                //   selectedRow.map((item) => item.user.uuid)
                // );
                e.preventDefault();
                try {
                  console.log("테스트중");
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]}
        />
      </div>
      {toggle && (
        <AdminModal datas={datas} toggle={toggle} setToggle={setToggle} />
      )}
    </>
  );
};

export default Admin;
