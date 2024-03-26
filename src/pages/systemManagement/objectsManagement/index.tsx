import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TableTemplate from "../../../components/table-base/TableTemplate";
import { t } from "i18next";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { ObjectsAPI } from "../../../api/systemManagement/objects.api";
import { GetObjects, SetObjects } from "../../../app/reducers/systemManagement/Objects/Objects.reducer";
import { ObjectsRequest } from "../../../interface/request/systemManagement/objects/ObjectsRequest.interface";

function ObjectsManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetObjects);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [tableParams, setTableParams] = useState<ObjectsRequest>({
    code: "",
    name: "",
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    ObjectsAPI.getObjects().then((result: any) => {
      dispatch(SetObjects(result.data.data.data));
      console.log(result.data.data.data);
      
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
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
  ];
  return (
    <>
      <TableTemplate
        title={t('titleTable')}
        active={
          <>
            <ButtonBase onClick={() => navigate(`${ROUTER_BASE.objectManagement.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`)} className='mx-2 btn btn__create'>{t('common.button.create')}</ButtonBase>
          </>
        }
        columns={columns}
        data={data}
        tableParams={tableParams}
        loading={loading}></TableTemplate>
    </>
  );
}

export default ObjectsManagementIndex;
