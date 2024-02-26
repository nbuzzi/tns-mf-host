import React, { useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { store } from '../../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { useAsyncCall } from '../../../../hooks/useAsyncCall';
import { TRANSLATION } from '../../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

export const MemberSelected: React.FC<{
  selectedItem: string;
  onSelect: (item: string) => void;
}> = observer(({ selectedItem, onSelect }) => {
  const { acna } = store;

  useAsyncCall(acna.loadData, []);

  const handleItemSelect = (item: string): void => {
    onSelect(item);
  };

  const createItemClickHandler = (itemName: string) => {
    return (): void => {
      handleItemSelect(itemName);
    };
  };

  const textSelected = useMemo(() => {
    if (store.member.hasMemberConnectivity?.connectedAcnas) {
      const selectedMember =
        store.member.hasMemberConnectivity?.connectedAcnas.find(
          (member) => member.acna === selectedItem
        );
      return selectedMember
        ? `${selectedMember.acna} - ${selectedMember.knownAs}`
        : selectedItem;
    }
  }, [selectedItem, store.member.hasMemberConnectivity?.connectedAcnas]);

  const renderItems = useMemo(() => {
    if (store.member.hasMemberConnectivity?.connectedAcnas) {
      return store.member.hasMemberConnectivity?.connectedAcnas.map(
        (member) => (
          <Dropdown.Item
            key={member.acna}
            onClick={createItemClickHandler(member.acna)}
            className={selectedItem === member.acna ? 'active' : ''}
          >
            {`${member.acna} - ${member.knownAs}`}
          </Dropdown.Item>
        )
      );
    } else {
      return null;
    }
  }, [
    selectedItem,
    store.member.hasMemberConnectivity?.connectedAcnas,
    createItemClickHandler,
  ]);

  return (
    <Dropdown
      title="Options"
      id="dropdown-menu"
      data-testid="member-selected-dropdown"
    >
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-month"
        className="btn-dropdown"
      >
        {textSelected || (
          <Text text={TRANSLATION.SIDEBAR.MONITORING.MEMBERS.select} />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxHeight: '21rem', overflowY: 'auto' }}>
        {renderItems}
      </Dropdown.Menu>
    </Dropdown>
  );
});
