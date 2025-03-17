'use client';

import { Form, type ItemGroup } from '@lobehub/ui';
import { App, Button, Dropdown, Input, MenuProps } from 'antd';
import isEqual from 'fast-deep-equal';
import { ChevronDown } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useSyncSettings } from '@/app/[variants]/(main)/settings/hooks/useSyncSettings';
import { FORM_STYLE } from '@/const/layoutTokens';
import { DEFAULT_SETTINGS } from '@/const/settings';
import DataImporter from '@/features/DataImporter';
import { configService } from '@/services/config';
import { useChatStore } from '@/store/chat';
import { useFileStore } from '@/store/file';
import { useServerConfigStore } from '@/store/serverConfig';
import { serverConfigSelectors } from '@/store/serverConfig/selectors';
import { useSessionStore } from '@/store/session';
import { useToolStore } from '@/store/tool';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

type SettingItemGroup = ItemGroup;

const Common = memo(() => {
  const { t } = useTranslation(['setting', 'common']);

  const [form] = Form.useForm();

  const showAccessCodeConfig = useServerConfigStore(serverConfigSelectors.enabledAccessCode);

  const [clearSessions, clearSessionGroups] = useSessionStore((s) => [
    s.clearSessions,
    s.clearSessionGroups,
  ]);
  const [clearTopics, clearAllMessages] = useChatStore((s) => [
    s.removeAllTopics,
    s.clearAllMessages,
  ]);
  const [removeAllFiles] = useFileStore((s) => [s.removeAllFiles]);
  const removeAllPlugins = useToolStore((s) => s.removeAllPlugins);
  const settings = useUserStore(settingsSelectors.currentSettings, isEqual);
  const [setSettings, resetSettings] = useUserStore((s) => [s.setSettings, s.resetSettings]);

  const { message, modal } = App.useApp();

  const handleReset = useCallback(() => {
    modal.confirm({
      centered: true,
      okButtonProps: { danger: true },
      onOk: () => {
        resetSettings();
        form.setFieldsValue(DEFAULT_SETTINGS);
        message.success(t('danger.reset.success'));
      },
      title: t('danger.reset.confirm'),
    });
  }, []);

  const handleClear = useCallback(() => {
    modal.confirm({
      centered: true,
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        await clearSessions();
        await removeAllPlugins();
        await clearTopics();
        await removeAllFiles();
        await clearAllMessages();
        await clearSessionGroups();

        message.success(t('danger.clear.success'));
      },
      title: t('danger.clear.confirm'),
    });
  }, []);

  const exportMenuItems: MenuProps['items'] = [
    {
      key: 'allAgent',
      label: t('exportType.allAgent', { ns: 'common' }),
      onClick: () => configService.exportAgents(),
    },
    {
      key: 'allAgentWithMessage',
      label: t('exportType.allAgentWithMessage', { ns: 'common' }),
      onClick: () => configService.exportSessions(),
    },
    {
      key: 'globalSetting',
      label: t('exportType.globalSetting', { ns: 'common' }),
      onClick: () => configService.exportSettings(),
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'all',
      label: t('exportType.all', { ns: 'common' }),
      onClick: () => configService.exportAll(),
    },
  ];

  const data: SettingItemGroup = {
    children: [
      {
        children: <DataImporter>{t('import', { ns: 'common' })}</DataImporter>,
        desc: "Import agents, messages, and settings from a backup file",
        label: "Import Configuration",
        minWidth: undefined,
      },
      {
        children: (
          <Dropdown menu={{ items: exportMenuItems }}>
            <Button type="primary">
              {t('export', { ns: 'common' })} <ChevronDown size={14} style={{ marginLeft: 4 }} />
            </Button>
          </Dropdown>
        ),
        desc: "Export your data to a backup file that can be imported later",
        label: "Export Configuration",
        minWidth: undefined,
      },
    ],
    title: "Data Management",
  };

  const system: SettingItemGroup = {
    children: [
      {
        children: (
          <Input.Password
            autoComplete={'new-password'}
            placeholder={t('settingSystem.accessCode.placeholder')}
          />
        ),
        desc: t('settingSystem.accessCode.desc'),
        hidden: !showAccessCodeConfig,
        label: t('settingSystem.accessCode.title'),
        name: ['keyVaults', 'password'],
      },
      {
        children: (
          <Button danger onClick={handleReset} type="primary">
            {t('danger.reset.action')}
          </Button>
        ),
        desc: t('danger.reset.desc'),
        label: t('danger.reset.title'),
        minWidth: undefined,
      },
      {
        children: (
          <Button danger onClick={handleClear} type="primary">
            {t('danger.clear.action')}
          </Button>
        ),
        desc: t('danger.clear.desc'),
        label: t('danger.clear.title'),
        minWidth: undefined,
      },
    ],
    title: t('settingSystem.title'),
  };

  useSyncSettings(form);

  return (
    <Form
      form={form}
      initialValues={settings}
      items={[data, system]}
      itemsType={'group'}
      onValuesChange={setSettings}
      variant={'pure'}
      {...FORM_STYLE}
    />
  );
});

export default Common;
