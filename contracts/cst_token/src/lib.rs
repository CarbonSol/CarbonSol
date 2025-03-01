// CarbonSol Token (CST) implementation
// This contract extends the SPL Token standard with additional functionality
// specific to carbon credit trading

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use spl_token::instruction as token_instruction;

// Program entrypoint
entrypoint!(process_instruction);

// Instruction types supported by the CST token program
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum CstInstruction {
    // Initialize the CST token with a fixed supply
    // Params: total_supply (u64)
    Initialize { total_supply: u64 },
    
    // Mint new CST tokens (only callable by authorized minters)
    // Params: amount (u64)
    Mint { amount: u64 },
    
    // Burn CST tokens (can be used for carbon offsetting)
    // Params: amount (u64)
    Burn { amount: u64 },
    
    // Transfer CST tokens
    // Params: amount (u64), recipient (Pubkey)
    Transfer { amount: u64, recipient: Pubkey },
}

// Process program instructions
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // Deserialize the instruction data
    let instruction = CstInstruction::try_from_slice(instruction_data)?;
    
    match instruction {
        CstInstruction::Initialize { total_supply } => {
            msg!("Instruction: Initialize CST Token");
            process_initialize(program_id, accounts, total_supply)
        }
        CstInstruction::Mint { amount } => {
            msg!("Instruction: Mint CST Token");
            process_mint(program_id, accounts, amount)
        }
        CstInstruction::Burn { amount } => {
            msg!("Instruction: Burn CST Token");
            process_burn(program_id, accounts, amount)
        }
        CstInstruction::Transfer { amount, recipient } => {
            msg!("Instruction: Transfer CST Token");
            process_transfer(program_id, accounts, amount, recipient)
        }
    }
}

// Initialize the CST token with a fixed supply
fn process_initialize(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    total_supply: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let token_mint_account = next_account_info(account_info_iter)?;
    let token_authority_account = next_account_info(account_info_iter)?;
    let payer_account = next_account_info(account_info_iter)?;
    let system_program = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    let rent_sysvar = next_account_info(account_info_iter)?;
    
    // Verify the token mint account is owned by the program
    if token_mint_account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }
    
    // Initialize the token mint account
    // In a real implementation, we would call the SPL token program to initialize
    // the mint account with the specified parameters
    
    msg!("CST Token initialized with total supply: {}", total_supply);
    
    Ok(())
}

// Mint new CST tokens (only callable by authorized minters)
fn process_mint(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let token_mint_account = next_account_info(account_info_iter)?;
    let token_authority_account = next_account_info(account_info_iter)?;
    let destination_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the token mint account is owned by the program
    if token_mint_account.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }
    
    // Verify the authority is a signer
    if !token_authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would call the SPL token program to mint
    // tokens to the destination account
    
    msg!("Minted {} CST tokens", amount);
    
    Ok(())
}

// Burn CST tokens (can be used for carbon offsetting)
fn process_burn(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let token_account = next_account_info(account_info_iter)?;
    let token_authority_account = next_account_info(account_info_iter)?;
    let token_mint_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the token account owner is a signer
    if !token_authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would call the SPL token program to burn
    // tokens from the specified account
    
    msg!("Burned {} CST tokens", amount);
    
    // Record carbon offset event (in a real implementation, this would update a ledger)
    msg!("Carbon offset recorded: {} tons", amount);
    
    Ok(())
}

// Transfer CST tokens
fn process_transfer(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
    recipient: Pubkey,
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    
    // Get accounts
    let source_account = next_account_info(account_info_iter)?;
    let source_authority_account = next_account_info(account_info_iter)?;
    let destination_account = next_account_info(account_info_iter)?;
    let token_program = next_account_info(account_info_iter)?;
    
    // Verify the source authority is a signer
    if !source_authority_account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }
    
    // In a real implementation, we would call the SPL token program to transfer
    // tokens from the source account to the destination account
    
    msg!("Transferred {} CST tokens to {}", amount, recipient);
    
    Ok(())
}

// Error types specific to the CST token program
#[derive(Debug, thiserror::Error)]
pub enum CstError {
    #[error("Insufficient balance")]
    InsufficientBalance,
    
    #[error("Unauthorized operation")]
    Unauthorized,
    
    #[error("Invalid amount")]
    InvalidAmount,
}

impl From<CstError> for ProgramError {
    fn from(e: CstError) -> Self {
        ProgramError::Custom(e as u32)
    }
} 