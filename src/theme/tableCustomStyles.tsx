import { IDataTableStyles } from 'react-data-table-component'

import theme from 'theme/index'

const horizontalPadding = '25px'

export const customStyles: IDataTableStyles = {
  table: {
    style: {
      borderBottomColor: theme.colors.lightGrey,
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      flexGrow: 1,
      marginBottom: '-1px',
    },
  },
  tableWrapper: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  },
  headRow: {
    style: {
      backgroundColor: theme.colors.whitesmoke3,
      borderBottomColor: theme.colors.lightGrey,
      borderBottomWidth: '1px',
      minHeight: '54px',
    },
  },
  headCells: {
    style: {
      color: theme.colors.textColor,
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '1.2',
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
      textTransform: 'uppercase',
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '1.2',
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
      whiteSpace: 'nowrap',
    },
  },
  rows: {
    style: {
      backgroundColor: theme.cards.backgroundColor,
      borderBottomColor: theme.colors.lightGrey,
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      color: theme.colors.textColor,
      fontSize: '15px',
      minHeight: '47px',
    },
    selectedHighlightStyle: {
      backgroundColor: theme.colors.whitesmoke3,
      borderBottomColor: `${theme.colors.lightGrey}`,
      color: theme.colors.darkerGrey,
    },
    highlightOnHoverStyle: {
      color: theme.colors.darkerGrey,
      backgroundColor: theme.colors.whitesmoke3,
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      borderBottomColor: `${theme.colors.lightGrey}`,
      outlineStyle: 'none',
      outlineWidth: '0',
    },
  },
  pagination: {
    style: {
      backgroundColor: theme.cards.backgroundColor,
      borderTopColor: 'transparent',
      borderTopStyle: 'solid',
      borderTopWidth: '0',
      color: theme.colors.textColor,
      flexGrow: 0,
      fontSize: '13px',
      minHeight: '63px',
    },
  },
  noData: {
    style: {
      flexGrow: 1,
    },
  },
}
