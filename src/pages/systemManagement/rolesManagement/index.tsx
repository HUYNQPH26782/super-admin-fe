import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetRoles, SetRoles } from "../../../app/reducers/Roles/Roles.reducer";
import { RolesAPI } from "../../../api/roles.api";
import TableTemplate from "../../../components/table-base/TableTemplate";
import { t } from "i18next";
import { RolesRequest } from "../../../interface/request/RolesRequest.interface";

function RolesManagementIndex() {
  const data = useAppSelector(GetRoles);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [tableParams, setTableParams] = useState<RolesRequest>({
    code: "",
    name: "",
    pagination: {
      current: 1,
      pageSize: 10,
    }
  });
  useEffect(() => {
    RolesAPI.getRoles().then((result: any) => {
      dispatch(SetRoles(result.data.data.data));
      setLoading(false)
    });
  }, [dispatch]);
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <TableTemplate
        title={t('titleTable')}
        columns={columns}
        data={data}
        tableParams={tableParams}
        loading={loading}></TableTemplate>
    </>
  );
}

export default RolesManagementIndex;
