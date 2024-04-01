import "./App.css";
import RouterRender from "./router/Router";
import 'animate.css';

function App() {

  return (
    <div className="App">
      <RouterRender></RouterRender>
      {/* <LayoutTemplate title={t('about')}>
        <div>
          <InputTextTemplate value={t('about')}></InputTextTemplate>
          <TableTemplate
            title={t('about')}
            columns={columns}
            data={data}
            tableParams={tableParams}
            loading={loading}
            handleTableChange={handleTableChange}></TableTemplate>
        </div>
      </LayoutTemplate> */}
    </div>
  );
}

export default App;
