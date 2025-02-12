'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/AlertDialog';
import { UrlField } from '@/components/UrlField';
import { getStreamer, restartWidget, testAlert } from '@/services/api/apiClient';
import { Tooltip } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoLink } from 'react-icons/io5';
import { LuPencilOff } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import { NavBar } from '../_partials/NavBar';

export default function WidgetsPage() {
  const { data: streamer } = useQuery({
    queryKey: ['streamer'],
    queryFn: () => {
      try {
        return getStreamer();
      } catch (error) {
        console.error(error);
      }
    }
  });
  const handleAlertTest = async () => {
    try {
      await testAlert(streamer?.widgets.alert_id || '');
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconPress = async (event: React.MouseEvent) => {
    const iconClicked = event.currentTarget.id;

    switch (iconClicked) {
      case 'qrc-restart':
        await restartWidget(streamer?.widgets.qrc_id || '');
        break;
      case 'alert-play':
        await handleAlertTest();
        break;
      case 'alert-restart':
        await restartWidget(streamer?.widgets.alert_id || '');
        break;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-start justify-start gap-10">
      <NavBar />
      <div className="flex w-full flex-col items-start justify-center gap-12 py-10">
        <h1 className="text-3xl font-bold text-secondaryColor">Widgets</h1>
        <div className="flex flex-row items-start justify-center gap-5">
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-xl font-medium text-gray-500">Alert</h1>
            <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg bg-gray-100 p-8">
              <div className="flex w-full flex-col items-center justify-center gap-2 text-center font-sans text-3xl text-white [text-shadow:_0px_0px_4px_rgba(0,0,0,0.7)]">
                <Image src="/FLIZLogo.png" width={68} height={68} alt="Fliz Logo" />
                <span className="m-0 p-0 text-[#80ed99]">{`${streamer?.username} donated 5,00 €`}</span>
                <span className="text-2xl">This is a template donation.</span>
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button type="button" aria-label="Implement widget" className="cursor-pointer text-secondaryColor">
                      <Tooltip side="bottom" content="Implement">
                        <IoLink id="alert-link" size={18} />
                      </Tooltip>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-4 bg-white">
                    <AlertDialogTitle>Implement widget</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-secondaryColor">
                      Use the URL below in your streaming software (OBS, Twitch Studio, etc.) as a Browser Source.
                    </AlertDialogDescription>
                    <UrlField url={`http://localhost:8080/streamer/widget/alert/${streamer?.widgets.alert_id}`} />
                    <div className="flex w-full flex-col items-start justify-center gap-1 px-2 text-secondaryColor">
                      <h1 className="text-lg text-secondaryColor">Recommended Size</h1>
                      <div className="flex w-full flex-row items-center justify-start gap-10">
                        <div>
                          <h1 className="font-bold">WIDTH</h1>
                          <h1>800px</h1>
                        </div>
                        <div>
                          <h1 className="font-bold">HEIGHT</h1>
                          <h1>400px</h1>
                        </div>
                      </div>
                    </div>
                    <AlertDialogCancel className="w-20 border-secondaryColor">Close</AlertDialogCancel>
                  </AlertDialogContent>
                </AlertDialog>
                <Tooltip side="bottom" content="Test">
                  <FaCirclePlay
                    id="alert-play"
                    size={18}
                    className="cursor-pointer text-secondaryColor"
                    onClick={event => handleIconPress(event)}
                  />
                </Tooltip>
                <Tooltip side="bottom" content="Reload">
                  <MdOutlineReplay
                    id="alert-restart"
                    size={18}
                    className="cursor-pointer text-secondaryColor"
                    onClick={() => restartWidget(streamer?.widgets.alert_id || '')}
                  />
                </Tooltip>
                <Tooltip content="Coming soon" side="bottom">
                  <LuPencilOff size={18} className="text-grey80" />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-xl font-medium text-gray-500">QRCODE</h1>
            <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg bg-gray-100 p-8">
              {streamer?.widgets?.qrc_id && (
                <iframe
                  src={`http://localhost:8080/streamer/widget/qrc/${streamer.widgets.qrc_id}`}
                  style={{
                    width: '320px',
                    height: '320px',
                    background: 'transparent',
                    border: 'none'
                  }}
                />
              )}
              <div className="flex w-full flex-row items-center justify-between">
                <Tooltip content="Implement" side="bottom">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        aria-label="Implement widget"
                        className="cursor-pointer text-secondaryColor">
                        <Tooltip side="bottom" content="Implement">
                          <IoLink id="alert-link" size={18} />
                        </Tooltip>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="gap-4 bg-white">
                      <AlertDialogTitle>Implement widget</AlertDialogTitle>
                      <AlertDialogDescription className="text-lg text-secondaryColor">
                        Use the URL below in your streaming software (OBS, Twitch Studio, etc.) as a Browser Source.
                      </AlertDialogDescription>
                      <UrlField url={`http://localhost:8080/streamer/widget/qrc/${streamer?.widgets.qrc_id}`} />
                      <div className="flex w-full flex-col items-start justify-center gap-1 px-2 text-secondaryColor">
                        <h1 className="text-lg text-secondaryColor">Recommended Size</h1>
                        <div className="flex w-full flex-row items-center justify-start gap-10">
                          <div>
                            <h1 className="font-bold">WIDTH</h1>
                            <h1>800px</h1>
                          </div>
                          <div>
                            <h1 className="font-bold">HEIGHT</h1>
                            <h1>400px</h1>
                          </div>
                        </div>
                      </div>
                      <AlertDialogCancel className="w-20 border-secondaryColor lg:py-2">Close</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </Tooltip>
                <Tooltip content="Reload" side="bottom">
                  <MdOutlineReplay
                    id="qrc-restart"
                    size={18}
                    className="cursor-pointer text-secondaryColor"
                    onClick={event => handleIconPress(event)}
                  />
                </Tooltip>
                <Tooltip content="Coming soon" side="bottom">
                  <LuPencilOff size={18} className="text-grey80" />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
