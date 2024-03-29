import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Dropdown, Layout, Menu, Select } from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../interface/constants/languages";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetMenu, SetMenu } from "../../app/reducers/common/Menu/Menu.reducer";
import { MenuAPI } from "../../api/common/menu.api";
import type { IMenu } from "../../interface/Menu.interface";
import { Link } from "react-router-dom";
import { BreakcrumbType } from "../../interface/constants/router/RouterType.type";
import 'animate.css';

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
    MenuAPI.getMenu().then((result: any) => {
      dispatch(SetMenu(result.data));
      console.log(result);
    });
  }, [dispatch]);

  const [collapsed, setCollapsed] = useState(false);

  const { i18n, t } = useTranslation();

  const onChangeLang = (langCode: string) => {
    i18n.changeLanguage(langCode, undefined);
  };

  function buildMenuTree(menuList: IMenu[]): MenuItem[] {
    return menuList.map((el) => {
      if (el.childId && el.childId.length > 0) {
        return getItem(
          <Link to={el.url ?? ""}>
            {/* { el.} */}
            <span style={{ marginLeft: 15, marginRight: 15 }}>{el.name}</span>
          </Link>,
          el.url + "",
          buildMenuTree(el.childId)
        );
      }
      return getItem(
        <Link to={el.url ?? ""}>
          {/* { el.} */}
          <span style={{ marginLeft: 15, marginRight: 15 }}>{el.name}</span>
        </Link>,
        el.url + ""
      );
    });
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      children,
      label,
    } as MenuItem;
  }

  // const itemsMenu: MenuItem[] = [
  //   getItem("Option 1", "1", <PieChartOutlined />),
  //   getItem("Option 2", "2", <DesktopOutlined />),
  //   getItem("User", "sub1", <UserOutlined />, [
  //     getItem("Tom", "3", <UserOutlined />),
  //     getItem("Bill", "4"),
  //     getItem("Alex", "5"),
  //   ]),
  //   getItem("Team", "sub2", <TeamOutlined />, [
  //     getItem("Team 1", "6"),
  //     getItem("Team 2", "8"),
  //   ]),
  //   getItem("Files", "9", <FileOutlined />),
  // ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <Select
          defaultValue={i18n.language}
          onChange={onChangeLang}
          options={LANGUAGES.map(({ code, label }) => ({
            value: code,
            label: label,
          }))}
        />
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#ffff",
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
      </Sider>
      <Layout
        style={
          collapsed
            ? { marginLeft: 80, transition: "all 0.2s,background 0s" }
            : { marginLeft: 200, transition: "all 0.2s" }
        }
      >
        <Header
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
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 45,
              height: 45,
              margin: "5px 0 ",
            }}
          />
          <div style={{ marginRight: 15 }}>
            <span>
              <Dropdown menu={{ items }} placement="bottomRight">
                <CaretDownOutlined />
              </Dropdown>
            </span>
          </div>
        </Header>

        <Content className={`animate__animated animate__bounceInRight m-[20px] h-screen"`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
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
          <div>
          {children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutTemplate;
