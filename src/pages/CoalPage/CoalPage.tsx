import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router";
import CoalStore from "../../store/coal";
import { CoalEditDialog, ProductInfo, CommentsList } from "../../components";
import "./CoalPage.scss";
import { GUID, Coal } from "../../Types";
import { confirm } from "../../UI";
import { useUnmount } from "../../hooks";

type paramsType = { id: GUID };

export const CoalPage = observer(() => {
  const [isVisible, toggleVisible] = useState<boolean>(false);
  let { id } = useParams<paramsType>();
  const navigate = useNavigate();

  if (!id) {
    navigate("/notFound");
  }

  useUnmount(() => {
    CoalStore.clearCoalData();
  });

  useEffect(() => {
    if (id) {
      CoalStore.getCoal(id);
    }
  }, [id]);

  const updateCoal = (): void => {
    toggleVisible(true);
  };

  const deleteCoal = async (id: GUID) => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот табак из списка?"
    );
    if (res) {
      await CoalStore.deleteCoal(id);
      navigate("/");
    }
  };

  const deleteComment = async (id: GUID): Promise<void> => {
    const res = await confirm(
      "Вы уверены что хотите удалить этот комментарий?"
    );

    if (res) {
      console.log(`deleteComment ${id}`);
    }
  };

  const coal: Coal | null = CoalStore.coal;

  if (!coal) {
    // TODO: поместить красивый спиннер ^_^
    return <div>Loading...</div>;
  }

  const getComment = async (
    text: string,
    id: GUID | null
  ): Promise<boolean> => {
    console.log("getComment", text, id);
    return true;
  };

  return (
    <div className="coalPage w100">
      <CoalEditDialog
        coal={CoalStore.coal}
        isVisible={isVisible}
        closeDialog={() => toggleVisible(false)}
      />
      <ProductInfo
        product={coal}
        onDelete={deleteCoal}
        onUpdate={updateCoal}
        onChangeRating={(value: number) => console.log("onChangeRating", value)}
        toggleFavorite={() => console.log("toggleFavorite")}
      />
      <CommentsList
        comments={[]}
        getComment={getComment}
        deleteComment={deleteComment}
      />
    </div>
  );
});