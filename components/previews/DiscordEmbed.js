import { DiscordMessage, DiscordMessages } from "@skyra/discord-components-react";
import { TagEmbeds } from "../../utils/funcs.web";

export default function DiscordEmbedPreview({ embed, user }) {
  return (
    <DiscordMessages>
      <DiscordMessage author={user?.userName} avatar={`https://pheonixapi.com/api/discord/v1/user/${user?.userId}/avatar?size=512&proxy=true`}>
        <p className='underline text-blue-500'>https://shanara.host/i/ajsbd123</p>
        <div className='embed-preview rounded flex p-3 text-base' style={{ borderLeft: `4px solid ${embed?.color} ` }}>
          <div className='overflow-hidden'>
            <p className='text-sm whitespace-pre-wrap'>{TagEmbeds(embed?.provider || "")}</p>
            <p className='mt-1 mb-0 text-bold text-white'>{TagEmbeds(embed?.author || "")}</p>
            <p className='whitespace-pre-wrap mt-1 font-bold text-blue-400'>{TagEmbeds(embed?.title || "")}</p>
            <p className='text-sm whitespace-pre-wrap'>{TagEmbeds(embed?.description || "")}</p>
            <img className='mt-2 w-1/2' src='https://cdn.trit.wtf/assets/logos/shanara.png' />
          </div>
        </div>
      </DiscordMessage>
    </DiscordMessages>
  );
}
