import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { unstable_after as after } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

/**
 * スタートアップの閲覧数を表示し、Sanityデータベース内の閲覧数を
 * インクリメントするコンポーネント。
 *
 * @param {string} id 閲覧数を取得するスタートアップのID。
 *
 * @returns 閲覧数を表示し、閲覧数の増加を示す小さな
 * パルスアニメーションを伴うコンポーネント。
 */

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">views: {totalViews} </span>
      </p>
    </div>
  );
};

export default View;
