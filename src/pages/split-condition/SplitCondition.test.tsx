import React from 'react'
import { render } from '@testing-library/react'
import { SplitCondition } from './SplitCondition'
import { Remote } from '../../util/remoteData'
import { BigNumber } from 'ethers/utils'
import { NetworkConfig } from '../../config/networkConfig'
import { ZERO_BN } from '../../config/constants'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloProviderWrapper } from 'contexts/Apollo'
import { MockedProvider } from '@apollo/react-testing'

const unlockCollateral = jest.fn()
const onCollateralChange = jest.fn()
const splitPosition = jest.fn()
const hasUnlockedCollateral = false
const networkConfig = new NetworkConfig(4)
const tokens = networkConfig.getTokens()
const CTService = jest.mock('../../services/conditionalTokens') as any

test('show unlock button with zero allowance', async () => {
  const allowance = Remote.success<BigNumber>(ZERO_BN)

  const { findByText } = render(
    <MockedProvider>
      <SplitCondition
        allowance={allowance}
        splitPosition={splitPosition}
        unlockCollateral={unlockCollateral}
        onCollateralChange={onCollateralChange}
        hasUnlockedCollateral={hasUnlockedCollateral}
        ctService={CTService}
        tokens={tokens}
      />
    </MockedProvider>
  )
  const unlockBtn = await findByText(/unlock/i)
  expect(unlockBtn).toBeInTheDocument()
})

test('toggle unlock button visiblity according to allowance and amount', async () => {
  const allowance = Remote.success<BigNumber>(new BigNumber(10))

  const { findByText, queryByText, findByPlaceholderText } = render(
    <MockedProvider>
      <SplitCondition
        allowance={allowance}
        splitPosition={splitPosition}
        unlockCollateral={unlockCollateral}
        onCollateralChange={onCollateralChange}
        hasUnlockedCollateral={hasUnlockedCollateral}
        ctService={CTService}
        tokens={tokens}
      />
    </MockedProvider>
  )

  const unlockBefore = queryByText(/unlock/i)
  expect(unlockBefore).toBeNull()

  const amountInput = await findByPlaceholderText('0.00')
  await act(async () => {
    return userEvent.type(amountInput, '20')
  })
  const unlockAfter = await findByText(/unlock/i)

  expect(unlockAfter).toBeInTheDocument()
})

test('show unlock button after failure', async () => {
  const allowance = Remote.success<BigNumber>(ZERO_BN)
  const allowanceFailure = Remote.failure<BigNumber>(new Error('Metamask cancelled'))

  const { findByText, rerender } = render(
    <MockedProvider>
      <SplitCondition
        allowance={allowance}
        unlockCollateral={unlockCollateral}
        splitPosition={splitPosition}
        onCollateralChange={onCollateralChange}
        hasUnlockedCollateral={hasUnlockedCollateral}
        ctService={CTService}
        tokens={tokens}
      />
    </MockedProvider>
  )

  const unlock = await findByText(/unlock/i)
  act(() => {
    return userEvent.click(unlock)
  })

  rerender(
    <MockedProvider>
      <SplitCondition
        allowance={allowanceFailure}
        splitPosition={splitPosition}
        unlockCollateral={unlockCollateral}
        onCollateralChange={onCollateralChange}
        hasUnlockedCollateral={true}
        ctService={CTService}
        tokens={tokens}
      />
    </MockedProvider>
  )

  const unlockAfterFailure = await findByText(/unlock/i)
  expect(unlockAfterFailure).toBeInTheDocument()
})
