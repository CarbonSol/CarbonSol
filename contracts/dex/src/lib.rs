// CarbonSol DEX - Decentralized Exchange for Carbon Credits
// This contract implements a DEX for trading CST and VCU tokens

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    clock::Clock,
    sysvar::Sysvar,
};
use spl_token::instruction as token_instruction;

// Program entrypoint
entrypoint!(process_instruction);

// Order type (buy or sell)
#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq)]
pub enum OrderType {
    Buy,
    Sell,
}

// Token pair for trading
#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq)]
pub enum TokenPair {
    // CST/SOL pair
    CstSol,
    // VCU/CST pair
    VcuCst,
    // VCU/SOL pair
    VcuSol,
}

// Order structure
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Order {
    // Order owner
    pub owner: Pubkey,
    // Token pair
    pub token_pair: TokenPair,
    // Order type (buy or sell)
    pub order_type: OrderType,
    // Price in lamports (SOL) or tokens
    pub price: u64,
    // Amount of tokens to buy or sell
    pub amount: u64,
    // Timestamp when the order was created
    pub created_at: u64,
    // Whether the order has been filled
    pub is_filled: bool,
}

// Instruction types supported by the DEX program
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum DexInstruction {
    // Initialize the DEX
    Initialize,
    
    // Create a new order
    // Params: order_type (OrderType), token_pair (TokenPair), price (u64), amount (u64)
    CreateOrder {
        order_type: OrderType,
        token_pair: TokenPair,
        price: u64,
        amount: u64,
    },
    
    // Cancel an existing order
    // Params: order_account (Pubkey)
    CancelOrder {
        order_account: Pubkey,
    },
    
    // Execute a trade between two matching orders
    // Params: buy_order_account (Pubkey), sell_order_account (Pubkey)
    ExecuteTrade {
        buy_order_account: Pubkey,
        sell_order_account: Pubkey,
    },
    
    // Add liquidity to a trading pair
    // Params: token_pair (TokenPair), token_a_amount (u64), token_b_amount (u64)
    AddLiquidity {
        token_pair: TokenPair,
        token_a_amount: u64,
        token_b_amount: u64,
    },
    
    // Remove liquidity from a trading pair
    // Params: token_pair (TokenPair), liquidity_amount (u64)
    RemoveLiquidity {
        token_pair: TokenPair,
        liquidity_amount: u64,
    },
}

// Process program instructions
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Deserialize the instruction data
    let instruction = DexInstruction::try_from_slice(instruction_data)?;
    
    match instruction {
        DexInstruction::Initialize => {
            msg!("Instruction: Initialize DEX");
            process_initialize(program_id, accounts)
        }
        DexInstruction::CreateOrder { order_type, token_pair, price, amount } => {
            msg!("Instruction: Create Order");
            process_create_order(program_id, accounts, order_type, token_pair, price, amount)
        }
        DexInstruction::CancelOrder { order_account } => {
            msg!("Instruction: Cancel Order");
            process_cancel_order(program_id, accounts, order_account)
        }
        DexInstruction::ExecuteTrade { buy_order_account, sell_order_account } => {
            msg!("Instruction: Execute Trade");
            process_execute_trade(program_id, accounts, buy_order_account, sell_order_account)
        }
        DexInstruction::AddLiquidity { token_pair, token_a_amount, token_b_amount } => {
            msg!("Instruction: Add Liquidity");
            process_add_liquidity(program_id, accounts, token_pair, token_a_amount, token_b_amount)
        }
        DexInstruction::RemoveLiquidity { token_pair, liquidity_amount } => {
            msg!("Instruction: Remove Liquidity");
            process_remove_liquidity(program_id, accounts, token_pair, liquidity_amount)
        }
    }
}

// Initialize the DEX
fn process_initialize(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let dex_state_account = next_account_info(account_info_iter)?;
    let admin_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;
    
    // Verify the admin is a signer
    if !admin_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would initialize the DEX state account
    // with initial parameters like fees, supported token pairs, etc.
    
    msg!("DEX initialized");
    
    Ok(())
}

// Create a new order
fn process_create_order(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    order_type: OrderType,
    token_pair: TokenPair,
    price: u64,
    amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let order_account = next_account_info(account_info_iter)?;
    let owner_account = next_account_info(account_info_iter)?;
    let token_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;
    let clock_sysvar = next_account_info(account_info_iter)?;
    
    // Verify the owner is a signer
    if !owner_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // Get the current timestamp
    let clock = Clock::from_account_info(clock_sysvar)?;
    let current_timestamp = clock.unix_timestamp as u64;
    
    // Create the order
    let order = Order {
        owner: *owner_account.key,
        token_pair,
        order_type,
        price,
        amount,
        created_at: current_timestamp,
        is_filled: false,
    };
    
    // In a real implementation, we would:
    // 1. Serialize and store the order in the order account
    // 2. Lock the tokens or SOL being offered
    
    msg!("Order created: {:?} {:?} {} tokens at price {}", 
        order.order_type, order.token_pair, order.amount, order.price);
    
    Ok(())
}

// Cancel an existing order
fn process_cancel_order(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    order_account: Pubkey,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let order_account_info = next_account_info(account_info_iter)?;
    let owner_account = next_account_info(account_info_iter)?;
    let token_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the owner is a signer
    if !owner_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would:
    // 1. Deserialize the order from the order account
    // 2. Verify the order owner matches the signer
    // 3. Return locked tokens or SOL to the owner
    // 4. Close the order account
    
    msg!("Order canceled: {}", order_account);
    
    Ok(())
}

// Execute a trade between two matching orders
fn process_execute_trade(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    buy_order_account: Pubkey,
    sell_order_account: Pubkey,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let buy_order_account_info = next_account_info(account_info_iter)?;
    let sell_order_account_info = next_account_info(account_info_iter)?;
    let buyer_token_account = next_account_info(account_info_iter)?;
    let seller_token_account = next_account_info(account_info_iter)?;
    let buyer_payment_account = next_account_info(account_info_iter)?;
    let seller_payment_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    let dex_fee_account = next_account_info(account_info_iter)?;
    
    // In a real implementation, we would:
    // 1. Deserialize both orders
    // 2. Verify they match (token pair, price)
    // 3. Calculate the trade amount (minimum of buy and sell amounts)
    // 4. Calculate fees
    // 5. Transfer tokens from seller to buyer
    // 6. Transfer payment from buyer to seller
    // 7. Transfer fees to the DEX fee account
    // 8. Update or close the order accounts
    
    msg!("Trade executed between buy order {} and sell order {}", 
        buy_order_account, sell_order_account);
    
    Ok(())
}

// Add liquidity to a trading pair
fn process_add_liquidity(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    token_pair: TokenPair,
    token_a_amount: u64,
    token_b_amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let liquidity_pool_account = next_account_info(account_info_iter)?;
    let provider_account = next_account_info(account_info_iter)?;
    let token_a_account = next_account_info(account_info_iter)?;
    let token_b_account = next_account_info(account_info_iter)?;
    let lp_token_mint_account = next_account_info(account_info_iter)?;
    let provider_lp_token_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the provider is a signer
    if !provider_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would:
    // 1. Transfer token A and token B from provider to the liquidity pool
    // 2. Calculate the amount of LP tokens to mint
    // 3. Mint LP tokens to the provider
    
    msg!("Added liquidity to {:?} pool: {} token A, {} token B", 
        token_pair, token_a_amount, token_b_amount);
    
    Ok(())
}

// Remove liquidity from a trading pair
fn process_remove_liquidity(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    token_pair: TokenPair,
    liquidity_amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let liquidity_pool_account = next_account_info(account_info_iter)?;
    let provider_account = next_account_info(account_info_iter)?;
    let token_a_account = next_account_info(account_info_iter)?;
    let token_b_account = next_account_info(account_info_iter)?;
    let lp_token_mint_account = next_account_info(account_info_iter)?;
    let provider_lp_token_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the provider is a signer
    if !provider_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would:
    // 1. Burn LP tokens from the provider
    // 2. Calculate the amount of token A and token B to return
    // 3. Transfer token A and token B from the liquidity pool to the provider
    
    msg!("Removed liquidity from {:?} pool: {} LP tokens", 
        token_pair, liquidity_amount);
    
    Ok(())
}

// Error types specific to the DEX program
#[derive(Debug, thiserror::Error)]
pub enum DexError {
    #[error("Orders do not match")]
    OrderMismatch,
    
    #[error("Insufficient liquidity")]
    InsufficientLiquidity,
    
    #[error("Invalid order")]
    InvalidOrder,
    
    #[error("Unauthorized")]
    Unauthorized,
    
    #[error("Price slippage exceeded")]
    PriceSlippageExceeded,
}

impl From<DexError> for ProgramError {
    fn from(e: DexError) -> Self {
        ProgramError::Custom(e as u32)
    }
} 