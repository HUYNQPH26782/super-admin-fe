import React, { memo, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Drawer,
  Layout,
  Menu,
  Popover,
  Row,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../interface/constants/languages";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetMenu, SetMenu } from "../../app/reducers/common/Menu/Menu.reducer";
import { MenuAPI } from "../../api/common/menu.api";
import type { IMenu } from "../../interface/Menu.interface";
import { Link } from "react-router-dom";
import { BreakcrumbType } from "../../interface/constants/router/RouterType.type";
import "animate.css";
import "./index.css";
import FontAwesomeBase from "../font-awesome/FontAwesomeBase";

const { Header, Content, Sider } = Layout;

interface LayoutTemplateProps {
  children: React.ReactNode;
  title: string;
  breakcrumb: BreakcrumbType[];
}

type MenuItem = Required<MenuProps>["items"][number];
const LayoutTemplate: React.FC<LayoutTemplateProps> = ({
  children,
  title,
  breakcrumb,
}) => {
  const data = useAppSelector(GetMenu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.length == 0) {
      MenuAPI.getMenu().then((result: any) => {
        dispatch(SetMenu(result.data));
      });
    }
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const { i18n, t } = useTranslation();

  const onChangeLang = (langCode: string) => {
    i18n.changeLanguage("en", undefined);
  };

  function buildMenuTree(menuList: IMenu[]): MenuItem[] {
    return menuList.map((el) => {
      if (el.childId && el.childId.length > 0) {
        return getItem(
          <Link to={el.url ?? ""}>
            <span style={{ marginLeft: 15, marginRight: 15 }}>{el.name}</span>
          </Link>,
          el.url + "",
          buildMenuTree(el.childId),
          <FontAwesomeBase iconName={el.icon ?? ""} />
        );
      }
      if (el.parentId == null) {
        return getItem(
          <Link to={el.url ?? ""}>
            <span style={{ marginLeft: 15, marginRight: 15 }}>{el.name}</span>
          </Link>,
          el.url + "",
          undefined,
          <FontAwesomeBase iconName={el.icon ?? ""} />
        );
      }
      return getItem(
        <Link to={el.url ?? ""}>
          <span style={{ marginLeft: 15, marginRight: 15 }}>{el.name}</span>
        </Link>,
        el.url + ""
      );
    });
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    icon?: React.ReactNode
  ): MenuItem {
    return {
      key,
      children,
      label,
      icon,
    } as MenuItem;
  }

  return (
    <Layout className="min-h-svh">
      <Drawer
        id="drawer_ui"
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={"left"}
        width={250}
        style={{ background: "#fff", overflowX: "hidden" }}
      >
        <Layout
          id="layout_drawer"
          style={{ background: "#fff", overflowX: "hidden" }}
          className={` bg-white layout-dashboard`}
        >
          <Row className="flex justify-center align-middle mt-5 pb-8">
            <div className="brand text-center">
              <Link to="/" className="active">
                <img
                  src="https://img.pikbest.com/origin/09/28/36/57MpIkbEsTcKf.png!w700wp"
                  alt=""
                />
              </Link>
            </div>
          </Row>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={buildMenuTree(data)}
          />
        </Layout>
      </Drawer>
      <Sider
        id="sider_ui"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="shadow-md"
        style={{
          background: "#ffff",
        }}
      >
        <div
          style={{
            width: collapsed ? "80px" : "200px",
            position: "fixed",
            top: 0,
            transition: "all 0.2s",
          }}
        >
          <div>
            <img
              src="https://img.pikbest.com/origin/09/28/36/57MpIkbEsTcKf.png!w700wp"
              alt=""
            />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={buildMenuTree(data)}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          className="shadow-md"
          style={{
            padding: 0,
            background: "#ffff",
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            height: 45,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* show sider */}
            <Button
              type="text"
              id="btn__sider"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 45,
                height: 45,
                margin: "5px 0 ",
              }}
            />
            {/* show drawer */}
            <Button
              type="text"
              id="btn__drawer"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setVisible(true)}
              style={{
                fontSize: "16px",
                width: 45,
                height: 45,
                margin: "5px 0 ",
              }}
            />
          </div>
          <div style={{ marginRight: 15 }}>
            <span>
              <Popover
                placement="bottomRight"
                title={null}
                content={
                  <>
                  </>
                }
              >
                <CaretDownOutlined />
              </Popover>
            </span>
          </div>
          
          <Select
                      defaultValue={i18n.language}
                      onChange={onChangeLang}
                      options={LANGUAGES.map(({ code, label }) => ({
                        value: code,
                        label: label,
                      }))}
                    />
        </Header>

        <Content
          className={`animate__animated animate__bounceInRight my-[30px] mx-[40px] h-screen"`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 0,
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              <img
                style={{ width: 35, marginRight: 8 }}
                src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb2/1.5/30/1f41f.png"
                alt=""
              />
              {t(title)}
            </h2>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              {breakcrumb.map((el) => {
                return (
                  <>
                    <Breadcrumb.Item key={el.name}>
                      <Link to={el.path} key={el.name}>
                        {t(el.name)}
                      </Link>
                    </Breadcrumb.Item>
                  </>
                );
              })}
            </Breadcrumb>
          </div>
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutTemplate);
